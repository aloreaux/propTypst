#import "template.typ": *

= Investment Profile

#set align(horizon + center)

/*#let testData = (
  "Product:": ("item 1", "item 2", "item 3"),
  "Install:": ("Inst 1", "Inst 2", "Inst 3"),
)

#table(
  columns: 2,
  column-gutter: 25%,
  inset: (x: 0pt, y: 2pt),
  stroke: none,
  table.header(
    [*All rooms for pricing*],
    [*Price*]
  ),
  table.hline(),
  for (name, items) in testData {
    [
      *#name*
      #if type(items) == array {
          for item in items {
              list(indent: 1em, item)
          }
      }
    ]
  },[\$10,000]
)*/

#show list: set block(spacing: 0.5em)

/*#let tableData = (
  "Product:": (items: ("Item 1", "Item 2", "Item 3"), price: "100.50"),
  "Install:": (items: ("Item 4", "Item 5")),
  "Service:": (items: ("Item 6", "Item 7", "Item 8"), price: "500.00"),
)*/

#context {
  let total = ()
  
  for (k,v) in invest-state.get() {
    if v.at("price", default: 0) != 0 {
      let clean = v.at("price").trim()
      total.push(decimal(clean))
    }
  }

  //line(length: 100%)
  //v(-0.9em)
  table(
    columns: (1fr, auto),
    //gutter: 0.5em,
    align: (left, right),
    inset: (y: 0.5em),
    stroke: none,
    // Table Header
    table.header([*Section / Items*],[*Price*],),
    table.hline(),
    // Iterate over sections and render dynamically
    ..for (section, data) in invest-state.get() {
      ([*#section*
      #for item in data.at("items") {
        text(size: 12pt)[#list(indent: 1em, eval(item, mode: "markup"))]
      }], table.hline(),
      if (lumpSumBool.get()) {
        []
      } else {
        if data.at("price", default: 0) != 0 {
          let clean = data.at("price").trim()
          [#format_dollars(decimal(clean))]
        } else {
          []
        }
      }
    )},
    table.hline(),
    table.footer([*Total Price* #text(size: 12pt)[_\*State Sales Tax, if applicable, is not included\*_]],[*#format_dollars(total.sum(default: 0))*],)
  )
  if (off52.get()) {
    align(left)[#text(size: 14pt)[*Contract: OFF52*\ *Vendor Code: VC6000163876*]]
  } else if (fac126.get()) {
    align(left)[#text(size: 14pt)[*Contract: FAC126*\ *Vendor Code: VC6000163876*]]
  } else if (gsa71.get()) {
    align(left)[#text(size: 14pt)[*NOTE: This is using SSC#":" 2750 Contract#":" GS-28F-006BA*]]
  } else if (gsa84.get()) {
    align(left)[#text(size: 14pt)[*NOTE: This is using SSC#":" 2725 Contract#":" GS-28F-006BA*]]
  } else if (mhec.get()) {
    align(left)[#text(size: 14pt)[*Contract: MC12-C07*]]
  } else if (ny.get()) {
    align(left)[#text(size: 14pt)[*Group: 20915*\ *Award: 23295*]]
  }
}
#pagebreak()
