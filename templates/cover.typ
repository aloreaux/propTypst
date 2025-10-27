#import "template.typ": *

#set par(leading: 0.35em, spacing: 1.5em, first-line-indent: 1.25em, justify: true)

#align(center)[
  #text(font: "Concourse C4", weight: "bold")[#context {adaptive_cover(title-state.get())}]
  #v(1fr)
  #text(font: "Concourse C2", size: 18pt, weight: "regular")[#context {customer-state.get()}]
  #v(1fr)
  #context {
    text(font: "Concourse C2", size: 18pt, weight: "regular")[
      #address-state.get()\ 
      #city-state.get(), #state-state.get() #zip-state.get()
    ]
  }
]


#set text(size: 14pt)

#v(1fr)
Thank you very much for this opportunity and your business!
#v(1fr)
#table(
  columns: 2,
  column-gutter: 25%,
  inset: (x: 0pt, y: 2pt),
  align: (left, left),
  stroke: none,
  [Date:],[#_today],
  [Proposal:],[#context{proposal-state.get()}],
  linebreak(),linebreak(),
  [Presented By:],[#context{author-state.get()}],
  [Office:],[800-222-6311 ext. #context{ext-state.get()}],
  [Cell:],[#context{cell-state.get()}],
  [Fax:],[#donn-fax],
  [Website:],[#donn-web],
)
#v(1fr)
#h(1.25em)
*It is understood that the recommendations herein are intended for consideration only by your organization and that the detailed operating advantages are obtainable through the integrated utilization of Donnegan Systems, Inc.'s products and services. Under no circumstances should this information be supplied to anyone not authorized by Donnegan Systems, Inc.*
#v(1fr)
#align(center)[
  *#donn-name\ 
  #donn-address\ 
  #donn-city, #donn-state #donn-zip*
  #v(1fr)
  _\* This proposal is valid for 14 days_
]

#pagebreak()
