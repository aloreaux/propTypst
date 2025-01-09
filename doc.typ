#import "templates/template.typ": *

#setup(
    title: $title$,
    author: $author$,
    customer: $customer$,
    address: $address$,
    city: $city$,
    state: $state$,
    zip: $zip$,
    ext: $extension$,
    cell: $cell$,
)

#makecover(
    imgpath: $imgpath$,
)

#include "templates/corporate.typ"
#if ($quote$) {
    include "templates/quote.typ"
}

#show: conf.with(
    imgpath: $cornerimg$,
    equip: $equip$,
    summary: $summary$,
    invest: $invest$,
    quantity: $quantity$,
    carriage: $carriage$,
)
#include "templates/cover.typ"

#if ($summaryBool$) {
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