#import "template.typ": *
#set text(fill: white)
#set heading(outlined: false)
#show heading.where(level: 1): it => [
    #set align(right)
    #set text(font: "Concourse C2", weight: "regular", size: 24pt)
    #block(it.body)
]
#show heading.where(level: 2): it => [
    #set text(font: "Concourse C2", weight: "regular", size: 20pt)
    #block(above: 1.75em, below: 1.75em, it.body)
]
#set text(font: "Concourse T2", size: 16pt)

#set page(
    margin: (top: 2in, bottom: 2in, left: 1in, right: 1in),
    fill: donn-blue,
)

#set par(leading: 0.35em, spacing: 1.5em, first-line-indent: 1.25em, justify: true)

= Corporate Overview

#set align(horizon)
== Storage Solutionist
#h(1.25em)
Donnegan Systems was established in 1976 and is a storage solutions provider offering space planning and innovative storage solutions. We handle various industrial, distribution, manufacturing, office, public safety, agriculture, higher education, healthcare, and commercial projects in the New England and Eastern New York markets.

Donnegan Systems is a leader in providing value-added storage solutions to our customers by creating a successful partnership with them throughout the entirety of the project. We pledge to establish lasting relationships with our customers by exceeding their expectations and gaining their trust through exceptional performance by every member of the Donnegan Systems team.

== Our Mission
#h(1.25em)
Dedication to providing quality products, technical and management services to our customers. We will strive to implement a long-term relationship with our clients based on safety, quality, timely service, and anticipating their needs. To help fulfill this mission, we will treat all employees fairly and involve them in the quality improvement process to insure responsiveness and cost-effective work execution.

#place(
    dy: 10%,
    center,
    image(
        "assets/donnegan-allwhite.png",
        width: 35%
    )
)
