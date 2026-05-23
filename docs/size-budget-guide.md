# Size Budget Guide

During build, AnimX generates `animx-size-report.json`.
Our target budget for the minified JS is under 150KB (un-gzipped), and CSS under 50KB. If we cross this threshold, a `warning` status is applied to the report.
