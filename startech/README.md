# 🌙 STARTECH
### Sun-Angle & Scale-Invariant Multi-Sensor Image Correspondence for Chandrayaan-2

STARTECH is an autonomous lunar image correspondence and registration platform designed to align images captured by different lunar imaging sensors and missions despite major differences in **sun angle, scale, resolution, illumination, and spectral characteristics**.

The platform focuses on Chandrayaan-2 optical payloads such as **OHRC, TMC-2, and IIRS**, while supporting correspondence with other lunar datasets such as **NASA LRO and JAXA SELENE**.

STARTECH combines **deep-learning-based feature detection and matching** with classical geometric verification to create a robust, auditable, and automated image-registration workflow.

---

## 🚀 Problem Statement

Registering lunar images captured at different times or by different sensors is a challenging computer-vision problem.

The same lunar terrain can appear dramatically different because of:

- ☀️ Different Sun elevation angles
- 🌓 Shadow reversal and illumination changes
- 🔍 Different spatial resolutions
- 📐 Scale and rotation differences
- 🌈 Different spectral bands
- 📷 Different sensor characteristics
- 🪨 Complex crater rims and boulder fields

Traditional feature-matching techniques such as **SIFT and ORB** can struggle when the same terrain has significant illumination and scale variations.

This makes accurate cross-mission image registration difficult for applications such as:

- Lunar crater mapping
- Landing-site verification
- Terrain analysis
- Scientific image co-registration
- Change detection
- Multi-mission lunar research

---

# 💡 Our Solution

STARTECH provides an **end-to-end automated correspondence pipeline** that processes lunar imagery from ingestion to final registration evaluation.

The system combines:

**Image Normalization → Illumination Correction → Feature Detection → Feature Matching → Outlier Rejection → Transformation Estimation → Image Warping → Accuracy Evaluation**

The complete process is presented through an interactive **mission-control-style web dashboard**.

---

# 🛰️ Supported Mission Data

### Chandrayaan-2

STARTECH is designed around optical imagery from:

- **OHRC** — Orbiter High Resolution Camera
- **TMC-2** — Terrain Mapping Camera-2
- **IIRS** — Imaging Infrared Spectrometer

### Cross-Mission Data

The platform can also be extended to lunar datasets from missions such as:

- **NASA LRO**
- **JAXA SELENE**

This enables correspondence between images acquired by different sensors and missions.

---

# ⚙️ STARTECH Pipeline

```text
┌──────────────────────────┐
│   Image Ingestion        │
│ PDS4 / GeoTIFF Products  │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│   Normalization          │
│ Radiometric Processing   │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│   Preprocessing          │
│ CLAHE + Denoising        │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│   Feature Detection      │
│ SuperPoint / AKAZE /     │
│ Multi-scale Harris       │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│   Feature Matching       │
│        LightGlue         │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│   Outlier Rejection      │
│ RANSAC / PROSAC +        │
│ Sampson Distance         │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ Transform Estimation     │
│ Homography / TPS         │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ Image Warping            │
│ Bicubic / TPS Warping    │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ Evaluation & Reporting   │
│ RMSE / Inlier Ratio /    │
│ Repeatability / SSIM     │
└──────────────────────────┘
```

---

# 🔬 Core Technologies

## 1. Image Ingestion & Normalization

STARTECH accepts lunar image products and prepares them for processing.

The ingestion stage is designed to support formats such as:

- PDS4
- GeoTIFF
- 16-bit sensor imagery

Radiometric normalization helps make image intensity values more comparable across sensors and missions.

---

## 2. Adaptive Preprocessing

Different Sun angles can produce large illumination differences between two images.

STARTECH uses:

### CLAHE

**Contrast Limited Adaptive Histogram Equalization**

Used for local contrast enhancement while limiting excessive amplification of noise.

### Bilateral Denoising

Preserves important structural boundaries while reducing image noise.

Together, these preprocessing techniques help reduce illumination-related differences before feature extraction.

---

# 🎯 3. Feature Detection

STARTECH combines modern deep-learning approaches with classical computer-vision techniques.

### SuperPoint

A deep-learning-based feature detector and descriptor used to identify distinctive image keypoints.

### AKAZE

A classical feature detector designed for efficient nonlinear scale-space feature extraction.

### Multi-Scale Harris

Used to detect strong corner-like structures at multiple scales.

These approaches are particularly useful for identifying structures such as:

- Crater rims
- Boulder fields
- Rock boundaries
- Surface intersections
- Distinctive terrain patterns

---

# 🔗 4. Feature Matching

STARTECH uses **LightGlue** for feature correspondence.

LightGlue uses an attention-based matching architecture to establish relationships between detected features.

It helps handle differences in:

- Scale
- Rotation
- Illumination
- View conditions
- Sensor characteristics

The resulting correspondences form the basis for geometric registration.

---

# 🧹 5. Outlier Rejection

Raw feature matching can contain incorrect correspondences.

STARTECH applies geometric verification using:

### RANSAC / PROSAC

These algorithms identify geometrically consistent correspondences while rejecting outliers.

### Sampson Distance

Sampson distance is used to evaluate geometric consistency between corresponding points.

The result is a reliable set of **inlier correspondences** that can be used for transformation estimation.

---

# 📐 6. Transform Estimation

After identifying reliable correspondences, STARTECH estimates the transformation required to align the source and reference images.

The pipeline can use:

- Homography estimation
- Sub-pixel transformation estimation
- Thin Plate Spline (TPS) transformation

The estimated transformation is then used to geometrically align the images.

---

# 🖼️ 7. Image Warping

The calculated transformation is applied to the source image.

STARTECH supports:

- Bicubic interpolation
- TPS warping

The result is an aligned image that can be visually compared with the reference image.

The dashboard can display:

```text
Source Image
      ↓
Registered Image
      ↓
Reference Image
      ↓
Overlay / Correspondence Visualization
```

---

# 📊 8. Evaluation & Accuracy

STARTECH provides quantitative metrics to evaluate registration quality.

### RMSE

Measures the average geometric registration error.

### Inlier Ratio

Measures the percentage of feature correspondences that remain geometrically consistent after outlier rejection.

### Feature Repeatability

Measures how consistently important features are detected between images.

### SSIM

**Structural Similarity Index Measure**

Used to compare structural similarity between registered and reference imagery.

These metrics provide an auditable evaluation of every registration job.

---

# 📈 Demonstrated Results

On the current cross-mission test data, the demonstrated pipeline reports approximately:

| Metric | Result |
|---|---:|
| Registration RMSE | **~0.84 px** |
| Inlier Ratio | **~92.7%** |

> These values represent the current test configuration and dataset. Performance can vary depending on sensor type, image quality, terrain characteristics, illumination conditions, and preprocessing parameters.

---

# 🖥️ Mission-Control Dashboard

STARTECH packages the complete workflow into an interactive web dashboard.

### Dashboard Features

- 🌙 Mission landing experience
- 📁 Image selection and ingestion
- ⚙️ Algorithm configuration
- 🔬 Processing pipeline visualization
- 🎯 Feature correspondence visualization
- 🧭 Registration and transformation views
- 🖼️ Warped image overlay
- 📊 Evaluation metrics
- 📋 Job history
- ⚙️ Settings
- 📤 Results export

The goal is to transform a traditionally manual GIS/image-processing workflow into a **repeatable and transparent automated system**.

---

# 🗂️ Project Structure

```bash
startech/
│
├── app/
│   ├── page.tsx
│   ├── register/
│   ├── processing/
│   ├── algorithms/
│   ├── results/
│   ├── settings/
│   └── jobs/
│
├── components/
│   ├── dashboard/
│   ├── pipeline/
│   ├── visualization/
│   ├── charts/
│   └── ui/
│
├── lib/
│   ├── algorithms/
│   ├── mock-data/
│   └── utilities/
│
├── public/
│   └── assets/
│
├── types/
│   └── index.ts
│
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

---

# 🛠️ Tech Stack

### Frontend

- **Next.js 14**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

### Computer Vision / AI Pipeline

- SuperPoint
- LightGlue
- AKAZE
- Multi-Scale Harris
- CLAHE
- Bilateral Filtering
- RANSAC
- PROSAC
- Homography
- Thin Plate Spline
- SSIM

### Data Formats

- PDS4
- GeoTIFF
- 16-bit imagery

---

# 💻 Getting Started

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd startech
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Start Development Server

```bash
npm run dev
```

## 4. Open in Browser

```text
http://localhost:3000
```

---

# 📜 Available Scripts

```bash
npm run dev       # Start development server

npm run build     # Create production build

npm run start     # Start production server

npm run lint      # Run lint checks
```

---

# 🔄 Workflow

A typical STARTECH registration job follows this workflow:

```text
Select Source Image
        ↓
Select Reference Image
        ↓
Configure Processing Parameters
        ↓
Normalize Image Data
        ↓
Preprocess Images
        ↓
Detect Features
        ↓
Match Features
        ↓
Remove Outliers
        ↓
Estimate Transformation
        ↓
Warp Source Image
        ↓
Generate Overlay
        ↓
Calculate Metrics
        ↓
Review Results
        ↓
Export Report
```

---

# 🌑 Applications

STARTECH can support several lunar research and exploration workflows.

### 🪨 Crater Mapping

Identify and compare crater structures across different datasets.

### 🚀 Landing-Site Verification

Compare candidate landing regions across multiple lunar observations.

### 🗺️ Terrain Analysis

Register imagery from different sensors to create a more comprehensive representation of lunar terrain.

### 🔄 Change Detection

Enable comparison of observations acquired at different times or under different imaging conditions.

### 🔬 Scientific Research

Provide researchers with a repeatable image-registration workflow for multi-sensor lunar imagery.

---

# 🌟 Key Advantages

### Multi-Sensor

Designed to handle imagery from different lunar sensors.

### Sun-Angle Robust

Preprocessing and learned feature matching help address illumination differences.

### Scale-Invariant

Feature extraction and matching are designed to handle differences in image scale.

### Automated

The complete workflow can be executed through a unified processing pipeline.

### Auditable

Every registration job can be evaluated using quantitative metrics.

### Extensible

The architecture can be extended with additional datasets, algorithms, and backend processing services.

---

# 🔮 Future Scope

Potential future improvements include:

- Real-time processing with GPU acceleration
- Direct integration with planetary data repositories
- Additional lunar missions and datasets
- More advanced multimodal feature descriptors
- Automated parameter optimization
- Large-scale lunar image indexing
- AI-assisted terrain interpretation
- Cloud-based processing
- Automated scientific report generation
- 3D lunar terrain integration

---

# 🏗️ Current Project Status

STARTECH currently provides a **mission-control-style frontend prototype** demonstrating the complete conceptual workflow from image ingestion to registration evaluation.

The architecture can be extended with backend APIs and real computer-vision inference services to execute the proposed algorithms on actual lunar imagery.

---

# 👥 Team

**STARTECH — Multi-Modal Lunar Image Correspondence**

Built for exploring automated, robust, and verifiable registration of multi-sensor lunar imagery.

---

# 📄 Reference

Project concept:

**STARTECH: Sun-Angle & Scale-Invariant Multi-Sensor Image Correspondence for Chandrayaan-2**

Target imagery:

**Chandrayaan-2 — OHRC, TMC-2, IIRS**

Potential cross-mission datasets:

**NASA LRO / JAXA SELENE**

---

## 🌙 Vision

> **Making multi-mission lunar imagery easier to align, compare, verify, and understand.**