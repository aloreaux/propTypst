#import "template.typ": *
#set text(fill: white)
#set heading(outlined: false)
#show heading.where(level: 1): it => [
    #set align(right)
    #set text(font: "Concourse C2", weight: "regular", size: 24pt)
    #block(below: 8%, it.body)
]

#set text(font: "Concourse T2", size: 18pt)

#set page(
    margin: (top: 2.125in, bottom: 2in, left: 1in, right: 1in),
    fill: donn-blue,
)

#set par(leading: 0.35em, spacing: 1.5em, justify: true)

/* TODO: have to add multiple quotes for all the markets */

= Testimonial
#set align(horizon)
#quote(block: true, attribution: [#emph(text(size: 12pt)[Production Manager])])[We are very pleased with the start-to-finish process that Donnegan had provided. The system operates exactly as promised and I am very pleased how everything went.

I want to give high praise to ALL the individuals who were here on site getting the system up and running. They were extremely courteous and showed up on time when they were expected. Communication was flawless with the crew when it came to giving status updates. In today’s given workforce pool, Donnegan definitely has some great employees!]

#quote(block: true, attribution: [#emph(text(size: 12pt)[Archivist])])[The end result is a system that fulfills all of my requisites and perfectly fits all of our delicate inventory. To say I am thrilled with the end product is an understatement - I am over the moon with how great this experience has been.

Thank you all so much for your help and for providing such superior products and service!]
