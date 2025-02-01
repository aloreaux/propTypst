#import "/templates/template.typ": *

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

#include "/templates/corporate.typ"
#if ($quoteBool$) {
    include "/templates/quote.typ"
}

#show: conf.with(
    imgpath: $cornerimg$,
    equip: $equip$,
    summary: $summary$,
    invest: $invest$,
    quantity: $quantity$,
    carriage: $carriage$,
    lump: $lumpBool$,
    off52Bool: $off52$,
    fac126Bool: $fac126$,
    gsa71Bool: $gsa71$,
    gsa84Bool: $gsa84$,
    mhecBool: $mhec$,
    nyBool: $ny$,
)
#include "/templates/cover.typ"

#if ($summaryBool$) {
    include "/templates/summary.typ"
}

#outline(indent: true)
#pagebreak()

#if ($equipBool$) {
  include "/templates/equipment.typ"
}

#include "/templates/investprof.typ"

#include "/templates/custaccept.typ"

#include "/templates/sov.typ"

#include "/templates/terms.typ"

#include "/templates/contract.typ"

#include "/templates/service.typ"

= Appendix
