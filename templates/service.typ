#import "template.typ": *

#show heading.where(level: 2): it => {
  set text(font: "Concourse C2", weight: "regular", size: 20pt)
  counter(heading).display("1.")
  h(0.5em)
  it.body
}

= Preventitive Maintenance & Service Agreement

#text(size: 14pt)[Donnegan Systems, Inc. stands behind its industry leading products with preventative maintenance. These preventative maintenance (PM Agreement) assure that the equipment is in productive condition at all times thus eliminating nonproductive downtime, reducing maintenance costs, extending equipment life, and protecting the investment that the equipment was purchased for initially.\ 

These preventative maintenance are covered as a part of your PM Agreement and will begin on completion of installation.
]

#v(1fr)

#set enum(indent: 1em)
#text(size: 12pt)[
  + *One [1] preventative maintenance inspection shall be performed every [12] months during the term of this agreement.* This service is performed by direct employed, factory-certified, service and installation personnel and includes a multi-point equipment inspection, all lubrications and adjustments as necessary, and replacement of worn or unserviceable parts as recommended by the manufacturer. PM’s may be performed during normal corrective repair visits.
  + *Priority service* attention is provided to equipment covered by a PM Agreement before service is rendered to other equipment that is not covered by such an agreement.
  + *A 20% discount on parts* after the initial 5 year manufacturer's defect warranty.
]

#v(1fr)

#text(size: 14pt)[
  To ensure Continued Service, please sign and return the enclosed agreement. Feel free to call (800) 222-6311 x229 should you have any questions regarding this PM Agreement covering your Equipment.
]
#pagebreak()

== Spacesaver Mobile 17 Point Inspection

#text(size: 14pt)[
#v(1fr)
Under a Donnegan Systems PM Agreement, Spacesaver modules receive comprehensive inspections, adjustments, and parts replacements as necessary during preventive maintenance calls.
#v(1fr)

+ Drive Chains – tension check, chain wear, squeaks and lubrication
+ Drive Shafts – shaft connections, drive pins.
+ Drive Sprockets – teeth wear, sprocket movement. 
+ Safety Circuits – check waist, toe, floor, infrared and auto devices.
+ PC Boards – check for dust, heat damage. 
+ Limit, Prelimit, Override, Indicator switches – confirm proper operation.
+ Wiring – confirm that wiring is contained and connections secure.
+ Carriage motor – confirm alignment, wear, gearbox operations. 
+ Carriage Wheel flanges – wear, rubbing track. 
+ Safety Devices – proper operation of aisle locks, anti-tips. 
+ Range alignment – check for improper movement. 
+ Ramp connection – confirm all connections. 
+ Shim/Deck – check for movement
+ Reference Shelf – confirm proper operation.
+ End Frame – check end frame attachment and alignment.
+ Track – confirm track is unobstructed. 
+ Inspection Report – review inspection with customer.]

#v(1fr)

#pagebreak()

== Terms and Conditions of Agreement

#v(1fr)

#text(size: 14pt)[
Mechanical Service will be furnished to the customer by Donnegan Systems for the equipment listed during the established business hours of Donnegan Systems Monday through Friday excluding holidays. All prices quoted herein for Systems and Microfilm Equipment to be placed under agreement are based on the understanding that all equipment will be used during a standard 40 hour work week of one shift, excluding Saturday, Sunday and holidays. Where equipment is used on a two or three shift basis, the regular pricing of the agreement is to be increased 25% or 50% respectively to cover usage only.\ 

The maintenance provided shall include preventative maintenance & corrective maintenance as set forth below. Parts will be offered with a 20% discount.\  

Preventative maintenance as required shall be performed during established business hours Monday through Friday. This service may be performed in connection with corrective maintenance. Preventative maintenance shall consist of lubrication, necessary adjustments and replacement of unserviceable parts.\ 

Corrective maintenance shall consist of on call remedial maintenance.\ 

Service requested by the customer during other than established business hours will be charged at the rates then in effect, including travel time and expense.\ 

MAINTENANCE SERVICE AND PARTS REPLACEMENT DOES NOT COVER REPAIRS OR PARTS RFEQUIRED BECAUSE OF AN ACCIDENT, FIRE, WATER, ABUSE OR MISUSE, NOR DOES IT COVER CHANGES IN SETUP, NOR, IN THE CASE OF MICROFILM EQUIPMENT, DOES IT INCLUDE BURNED OUT MOTORS, LAMPS, MIRRORS, RUBBER SLEEVES, SPONGES, SCREENS AND EXPENDABLE PARTS.\ 

The following repairs are not covered under the scope of this agreement:\ 

+ Damage or intermittent failure caused by connection to incorrect power supply.
+ Damage caused by improper storage of materials within equipment.
+ Repairs necessitated by abuse, negligent care, deliberate damage, accident, fire, flood, power surges, riots, war, or acts of God.
+ Any repairs attempted by the customer or other personnel not authorized by Donnegan Systems.
+ Repairs to ancillary equipment supplied by others, or damage caused by such equipment.

MECHANICAL SERVICE is authorized by the customer to be rendered by Donnegan Systems to the equipment listed for the period above noted and from year to year thereafter unless this agreement is terminated by either party as herein provided. Either party, may terminate this agreement upon written notice to the other party, given not less than thirty (30) days immediately prior to any anniversary date hereof. Donnegan Systems, Inc., reserves the right to examine equipment prior to any renewal of this agreement; and in the event the machine(s) require overhauling or rebuilding, an estimate will be submitted for the customer’s approval before the work is started.\ 

IF THE EQUIPMENT LISTED IS NOT REPAIRABLE, MAXIMUM LIABILITY FOR DONNEGAN SYSTEMS, INC. HEREUNDER SHALL BE AN AMOUNT NOT TO EXCEED THE TOTAL AMOUNT ACUTALLY PAID BY THE CUSTOMER FOR SERVICES DURING THE APPLICABLE TERM OF THE AGREEMENT.\ 

IN NO EVENT SHALL EITHER PARTY BE LIABLE TO THE OTHER PARTY FOR INDIRECT, CONSEQUENTIAL, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, OR LOST PROFITS. DONNEGAN SYSTEMS, INC. SHALL NOT BE RESPONSIBLE FOR FAILURE TO RENDER SERVICE FOR ANY CAUSES BEYOND ITS CONTROL INCLUDING, WITHOUT LIMITATION, STRIKES AND LABOR DISPUTES.\ 
]
#v(1fr)

#pagebreak()

== Service Agreement Pricing

#text(size: 14pt)[
#context {
  v(1em)
  table(
    columns: (2fr, 0.5fr, 1fr),
    //row-gutter: 0.2em,
    align: (left, center, right),
    inset: (y: 0.5em),
    stroke: none,
    [*Service Agreement for #title-state.get()*],[*Quantity*],[*Price*],
    table.hline(),
    [Cost Per Carriage],[#quantity-state.get()],[#format_dollars(decimal(carriageCost.get()))],
    table.hline(),
    table.cell(colspan: 2)[*Total Price:* #text(size: 12pt)[_\* State sales tax, if applicable, is not included_]],[*#format_dollars((decimal(quantity-state.get())*decimal(carriageCost.get())))*],
  )

}

#v(1em)
Misuse and / or abuse of the equipment is not covered under this contract. Any service calls performed that are a direct result of misuse and/or abuse will be charged at Donnegan's standard hourly rate of \$175/man hour and trip charge of \$350.\ 

This Service Agreement includes labor only for one year and a 20% discount on parts (if not covered under the manufacturers 5 year warranty). Service will be provided by factory trained technicians. Donnegan Systems will provide a minimum of 1 PM per year and a maximum of 2 if required by system usage. To show acceptance please sign and return this form via mail, fax or email srice\@donnegan.com. If you have questions please contact Tom Mulvey at (800) 222-6311 x 229.\ 
]

#v(1fr)

#text(size: 12pt)[
By: #box[#line(length: 42.5%)] #h(1fr) Date: #box[#line(length: 42.5%)]
#place(dx: 5.25em, dy: -0.75em)[Authorized Signature]
#linebreak()
Title: #box[#line(length: 40.5%)]]

#pagebreak()
