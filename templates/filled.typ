// Set up the page dimensions and default styling
#set page(width: 8.5in, height: 11in, margin: 1in)
#set text(align: left, font-size: 12pt)

// Draw the header with a rectangle and centered title
rectangle[fill: rgb(0.2, 0.4, 0.6), radius: 5pt, height: 2cm](
  align(center, middle)[
    text(28pt, bold: true, fill: white, Test)
  ]
)

// Add some vertical spacing after the header
box(height: 1cm)

// Main content with subtitle and body text
vstack(
  gap: 1em,
)(
  // Subtitle
  text(18pt, bold: true, Test1),

  // Body content
  text(12pt, Bkaggfjkdsf)
)

// Footer with a logo and note
box(height: 1cm)

hbox(
  gap: 1em,
)(
  // Footer note
  text(10pt, fill: gray, "Generated using Typst"),
  
  // Footer logo
  box(width: 2cm, height: 1cm, inset: 5pt)[
    image("path/to/logo.png")
  ]
)