#import "templates/template.typ": *

#setup(
    title: "Duxbury MA, Town of - Town Hall",
    author: "Andrew Loreaux",
    customer: "John Doe",
    address: "123 Main Road",
    city: "Duxbury",
    state: "MA",
    zip: "02332",
    ext: "222",
    cell: "339-832-0920",
)

#makecover(
    imgpath: "assets/business.jpg",
)

#include "templates/corporate.typ"
#if (true) {
    include "templates/quote.typ"
}

#show: conf.with(
    imgpath: "assets/biz.svg",
    equip: ("Room 1": ("Item 1", "Item 2", "Item 3"), "Room 2": ("Item 1", )),
    summary: ("objective": "This is our objective.", "solutions": ("Sol 1", )),
    invest: ("Product": (items: ("Item 1", ), price: "1012.75"), "Install": (items: ("Install for project", ), price: "5250"), "Freight": (items: ("Freight Is Subject To Change", ), price: "2000.50")),
    quantity: "20",
    carriage: "500",
)
#include "templates/cover.typ"

#if (true) {
    include "templates/summary.typ"
}

#outline(indent: true)
#pagebreak()

#include "templates/equipment.typ"

#include "templates/investprof.typ"

#include "templates/custaccept.typ"

#include "templates/sov.typ"

#include "templates/terms.typ"

#include "templates/contract.typ"

#include "templates/service.typ"

= Appendix