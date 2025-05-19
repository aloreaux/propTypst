#import "/templates/template.typ": *
#set page("us-letter")

#setup(
  title: $title$,
  author: $author$,
  proposal: $proposal$,
  customer: $customer$,
  address: $address$,
  city: $city$,
  state: $state$,
  zip: $zip$,
  ext: $extension$,
  cell: $cell$,
  cat: $imgcategory$,
)

#makecover(
  imgpath: $imgpath$,
)

#include "/templates/corporate.typ"
#if ($quoteBool$) {
  include "/templates/quote.typ"
}

#show: conf.with(
  cornerimgpath: $cornerimg$,
  equip: $equip$,
  summary: $summary$,
  invest: $invest$,
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

#outline(title: [Contents #v(2em)])
#pagebreak()

#if ($equipBool$) {
  include "/templates/equipment.typ"
}

#include "/templates/investprof.typ"

#include "/templates/custaccept.typ"

#include "/templates/sov.typ"

#include "/templates/terms.typ"

#include "/templates/contract.typ"

#if ($serviceBool$) {
  service(
    quantity: $quantity$,
    carriage: $carriage$,
  )
  include "/templates/service.typ"
}

= Appendix
