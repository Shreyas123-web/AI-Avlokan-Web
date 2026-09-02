import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

let pdfDoc = null;
let currentZoom = null;
let userZoom = 1;
let manualZoom = false;

// UPGRADE: Concurrency guards to prevent browser freezing on rapid zooms
let isRendering = false;
let abortRender = false;

window.openPDF = async function(pdfUrl) {
  const viewer = document.getElementById("pdfViewer");
  const loading = document.getElementById("pdfLoading");
  const error = document.getElementById("pdfError");
  const downloadBtn = document.getElementById("downloadBtn");
  const titleEl = document.querySelector(".pdf-title");
  
  if (!viewer) return;

  downloadBtn.href = pdfUrl;
  
  // UPGRADE: Extract and display the filename dynamically
  if (titleEl) {
    const filename = pdfUrl.split('/').pop() || 'Document.pdf';
    titleEl.textContent = decodeURIComponent(filename);
  }
  
  viewer.classList.add("active");
  document.body.style.overflow = "hidden";
  loading.style.display = "flex";
  error.classList.remove("active");
  
  // Reset state
  pdfDoc = null;
  manualZoom = false;
  userZoom = 1;
  document.getElementById("pdfPages").innerHTML = "";

  try {
    pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    await renderAllPages();
  } catch (err) {
    console.error('PDF Load Error:', err);
    loading.style.display = "none";
    error.classList.add("active");
  }
};

window.closePDF = function() {
  const viewer = document.getElementById("pdfViewer");
  if (viewer) {
    abortRender = true; // Stop any ongoing background rendering
    viewer.classList.remove("active");
    document.body.style.overflow = "";
  }
};

async function getFitScale() {
  const firstPage = await pdfDoc.getPage(1);
  const viewport = firstPage.getViewport({ scale: 1 });
  const pdfContent = document.getElementById("pdfContent");
  const availableWidth = pdfContent.clientWidth - 20;
  let fitScale = availableWidth / viewport.width;
  return fitScale;
}

// UPGRADE: Progressive background rendering
async function renderAllPages() {
  // If already rendering, signal abort and wait for it to stop cleanly
  if (isRendering) {
    abortRender = true;
    while (isRendering) { await new Promise(r => setTimeout(r, 50)); }
  }
  
  abortRender = false;
  isRendering = true;

  const pdfPages = document.getElementById("pdfPages");
  const zoomLevel = document.getElementById("zoomLevel");
  const loading = document.getElementById("pdfLoading");
  
  pdfPages.innerHTML = "";
  loading.style.display = "flex"; // Show loader while calculating

  if (!manualZoom) {
    currentZoom = await getFitScale();
  } else {
    currentZoom = userZoom;
  }

  zoomLevel.textContent = manualZoom
    ? `${Math.round(currentZoom * 100)}%`
    : "Fit";

  try {
    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      if (abortRender) break; // Break loop if user closed PDF or triggered a zoom
      
      await renderPage(pageNum);
      
      // UPGRADE: Hide loader IMMEDIATELY after Page 1 renders. 
      // The rest of the PDF loads silently in the background!
      if (pageNum === 1) {
        loading.style.display = "none";
      }
    }
  } finally {
    isRendering = false;
  }
}

async function renderPage(pageNum) {
  const page = await pdfDoc.getPage(pageNum);
  const viewport = page.getViewport({ scale: currentZoom });
  const deviceScale = window.devicePixelRatio || 1;

  const canvas = document.createElement("canvas");
  canvas.className = "pdf-page";
  const context = canvas.getContext("2d");

  // Handle Retina/High-DPI displays perfectly
  canvas.width = viewport.width * deviceScale;
  canvas.height = viewport.height * deviceScale;
  canvas.style.width = viewport.width + "px";
  canvas.style.height = viewport.height + "px";

  if (!manualZoom) {
    canvas.style.maxWidth = "100%";
  } else {
    canvas.style.maxWidth = "none";
  }

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
    transform: [deviceScale, 0, 0, deviceScale, 0, 0]
  };

  await page.render(renderContext).promise;
  document.getElementById("pdfPages").appendChild(canvas);
}

window.zoomIn = async function() {
  manualZoom = true;
  if (!userZoom || userZoom === 1) userZoom = currentZoom;
  
  userZoom += 0.20;
  if (userZoom > 3) userZoom = 3;
  
  currentZoom = userZoom;
  document.getElementById("zoomLevel").textContent = `${Math.round(currentZoom * 100)}%`;
  await renderAllPages();
};

window.zoomOut = async function() {
  manualZoom = true;
  if (!userZoom || userZoom === 1) userZoom = currentZoom;
  
  userZoom -= 0.20;
  if (userZoom < 0.5) userZoom = 0.5;
  
  currentZoom = userZoom;
  document.getElementById("zoomLevel").textContent = `${Math.round(currentZoom * 100)}%`;
  await renderAllPages();
};

window.fitToScreen = async function() {
  manualZoom = false;
  userZoom = 1;
  document.getElementById("zoomLevel").textContent = "Fit";
  await renderAllPages(); // will recalculate fit scale
};

document.addEventListener("keydown", function(event) {
  const viewer = document.getElementById("pdfViewer");
  if (event.key === "Escape" && viewer && viewer.classList.contains("active")) {
    closePDF();
  }
});

let resizeTimer;
window.addEventListener("resize", function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(async function() {
    const viewer = document.getElementById("pdfViewer");
    if (viewer && viewer.classList.contains("active") && !manualZoom) {
      await renderAllPages();
    }
  }, 300);
});
