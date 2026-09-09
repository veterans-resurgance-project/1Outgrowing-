# Field Media Contribution Guide

This document outlines the standard operating procedure for submitting and reviewing field photography for the Watership Stewards / Veterans Resurgence Project digital repository.

## Overview
To keep our public-facing landing page and newsletter assets fresh while maintaining strict quality and privacy standards, all field photos follow a **Staging-to-Production** workflow via GitHub.

## 1. Submitting Photos (For Field Staff)
Field crew members and media leads can upload raw or lightly edited photos directly through the GitHub web interface or mobile app.

* **Destination Folder:** Navigate to your repository and locate the `/incoming-staging/` directory.
* **Upload Process:** 
  1. Click **Add file** > **Upload files**.
  2. Drag and drop your image files into the browser.
  3. Provide a brief description in the commit message (e.g., *"Crew 3 slash piling - North Unit"*).
  4. Click **Commit changes**.

* **Safety & Quality Check Before Upload:**
  * Ensure no sensitive identifying info or confidential gear is visible.
  * Verify photos reflect our professional W-2 workforce and educational missions (forestry, native plants, drone mapping, etc.).

## 2. Review & Promotion (For Site Editors)
Administrators or designated reviewers are responsible for pulling images from the staging queue into the active site directory.

* **Review Stage:** Open the `/incoming-staging/` folder on GitHub to review newly submitted images for quality, resolution, and compliance.
* **Renaming for Production:** Rename approved image files to match our exact landing page card identifiers:
  * `forest-restoration.jpg` (Field Restoration card)
  * `nursery-propagation.jpg` (Native Plant Nursery card)
  * `drone-mapping.jpg` (Academic Research & Aerial Mapping card)
  * `framework-training.jpg` (Operational Framework card)
* **Deployment:** Move the renamed files into the root `/images/` directory. GitHub Pages will automatically rebuild and update the live site.
