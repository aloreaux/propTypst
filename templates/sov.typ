#import "template.typ": *

= Schedule of Values

#set align(horizon + center)

#context {
  let total = ()

  for (k,v) in invest-state.get() {
    if v.at("price", default: 0) != 0 {
      total.push(decimal(v.at("price")))
    }
  }

  let first = calc.round((total.sum(default: 0) * decimal("0.5")), digits: 2)
  let second = calc.round((total.sum(default: 0) * decimal("0.25")), digits: 2)
  let third = calc.round((total.sum(default: 0) - first - second), digits: 2)

  table(
    columns: (auto, 1fr, 1fr),
    row-gutter: 0.2em,
    align: (left, center, right),
    inset: (y: 10%),
    stroke: none,
    table.cell(colspan: 3, align: center)[#text(size: 24pt)[#donn-name]],
    [],[],[],
    table.hline(),
    [],[],[],
    [Project Name],table.cell(colspan: 2)[#title-state.get()],
    table.hline(),
    [],[],[],
    [Total Project Value:],[*#format_dollars(total.sum(default: 0))*],[#text(size: 10pt)[\*_Does not include State Sales Tax_]],
    table.hline(),
    [],[],[],
    [*Item No.*],[*Description of Work*],[*Price*],
    table.hline(),
    [],[],[],
    [1.],table.cell(align: left)[#text(size: 12pt, fractions: true)[1/2 Deposit for Material Release - Due at time of order]],[#format_dollars(first)],
    [2.],table.cell(align: left)[#text(size: 12pt)[2#super[nd] Payment - Due on shipment of product from manufacturer]],[#format_dollars(second)],
    [3.],table.cell(align: left)[#text(size: 12pt)[3#super[rd] Payment - Due upon completion of product installation]],[#format_dollars(third)],
    table.hline(),
    [],[],[],
    [],[*Grand Total:*],[*#format_dollars(total.sum(default: 0))*]
  )
}

#pagebreak()