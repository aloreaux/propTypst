#import "template.typ": *

= Customer Acceptance

#v(2em)
#align(center)[#text(font: "Concourse C2", weight: "thin")[Finish Selection & Order Entry Process]]

#set text(size: 14pt)

#v(2em)

#grid(
  columns: (auto, 1fr),
  row-gutter: 0.25em,
  align: (left, right + bottom, right + bottom),
  inset: (x: 0.75%,y: 10%),
  stroke: none,
  [*Finish Selection:*],[],
  v(0.5em),[],
  [End Panels:],[#box[#line(length: 50%)] #text(size: 10pt)[(if applicable, see appendix)]],
  [Shelving:],[#box[#line(length: 50%)] #text(size: 10pt)[(if applicable, see appendix)]],
  [Lockers:],[#box[#line(length: 50%)] #text(size: 10pt)[(if applicable, see appendix)]],
  [Floor Covering:],[#box[#line(length: 50%)] #text(size: 10pt)[(if applicable, see appendix)]],
  v(0.5em),[],
  [*Order Entry Checklist*],[],
  v(0.5em),[],
  [Sign Off On Drawing:],[#box[#line(length: 50%)] #text(size: 10pt)[#hide[(if applicable, see appendix)]]],
  [Sign Off On Proposal:],[#box[#line(length: 50%)] #text(size: 10pt)[#hide[(if applicable, see appendix)]]],
  [Submital Of Purchase Order:],[#box[#line(length: 50%)] #text(size: 10pt)[#hide[(if applicable, see appendix)]]],
  [Submital Of One-Half Deposit:],[#box[#line(length: 50%)] #text(size: 10pt)[#hide[(if applicable, see appendix)]]],
)

#pagebreak()

#align(center)[#text(size: 20pt)[*Acceptance*]]
#box[#line(length: 100%, stroke: 4pt)]
*#donn-name* President Donnegan Systems
#v(0.5em)
#box[#line(length: 100%, stroke: 4pt)]
*#donn-name* #context{author-state.get()}
#v(0.5em)
#box[#line(length: 100%, stroke: 4pt)]
*#context{adaptive_project(title-state.get())}* #context{customer-state.get()}
#v(0.5em)

#set text(size: 11.75pt)
#set enum(indent: 1em)
_
Notes:
+ Please circle or fill in the above selections at the time of order placement.
+ Pricing is based on standard finish selections. All custom paint finishes (indicated by bold print or in the metallic family) have an up-charge.
+ It is the customer’s responsibility to see that the above checklist items have been addressed before the submittal of the purchase order.
_

*Purchase Orders:*\ 
Purchase orders should be made out to the following:
#align(center)[
  #donn-name\ 
  #donn-address\ 
  #donn-city, #donn-state #donn-zip\ 
  Fax \#: #donn-fax
]

Please include finish selections, ship to address, contact name and phone number on your purchase
order

*Installation and Support:*\ 
All installation work is performed by insured and factory-trained system installers, ensuring highquality workmanship and accountability. Donnegan Systems, Inc. will coordinate installation with your schedule. All labor is based on straight time labor during normal working hours (7 a.m. to 3:30 p.m.). If overtime is required, additional costs will be incurred.

*Terms and Conditions*\ 
Enclosed are the standard terms and conditions of Donnegan Systems, Inc. Please note that a non-refundable down payment of one-half of the contract amount is due within ten calendar days of contract award.

*Leasing Options:*\ 
Leasing options are now available. Leasing payment plans eliminate the need to fund the total purchase price, maintain your company’s capital, and free up valuable bank credit lines. Please let us know if you want more information about this payment option.
#v(1fr)

#pagebreak()
