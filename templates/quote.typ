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
    margin: (top: 2in, bottom: 2in, left: 1in, right: 1in),
    fill: donn-blue,
)

#set par(leading: 0.35em, spacing: 1.5em, justify: true)

/* TODO: have to add multiple quotes for all the markets */

= Testimonial
#set align(horizon)

#context{
  if marketCat.get() == "athletics" [
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Assistant Director of Athletics])])[I would like to send my greatest thanks to you and everyone that helped put together our new storage system. It is amazing and we are very happy with how it all came out!]
  ] else if marketCat.get() == "business" [
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Production Manager])])[We are very pleased with the start-to-finish process that Donnegan had provided. The system operates exactly as promised and I am very pleased how everything went.

    I want to give high praise to ALL the individuals who were here on site getting the system up and running. They were extremely courteous and showed up on time when they were expected. Communication was flawless with the crew when it came to giving status updates. In today’s given workforce pool, Donnegan definitely has some great employees!]

    #quote(block: true, attribution: [#emph(text(size: 12pt)[Archivist])])[The end result is a system that fulfills all of my requisites and perfectly fits all of our delicate inventory. To say I am thrilled with the end product is an understatement - I am over the moon with how great this experience has been.

    Thank you all so much for your help and for providing such superior products and service!]
  ] else if marketCat.get() == "healthcare" [
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Materials Manager])])[The Materials management team loves the new set up and we are looking forward to getting our supplies on the shelf. This will bring our 5S process to another level and we hope to use this set up as a blueprint for other locations down the road.]
  ] else if marketCat.get() == "higheredu" [
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Assistant Director for Archives & Special Collections])])[Just wanted to send a quick note to formally thank you and the rest of the Donnegan’s team for excellent job on the new Rare Book compact shelving at WPI’s Gordon Library. We enjoyed working with you throughout the entire process and could not be happier with the work. Finishing more than a week early than we planned for affords us extra time to work on some of our other projects. We are very excited for the flexibility this project has afforded us in the realm of collections storage.
    
    I would especially like to compliment the installation crew for their wonderful work. Each member of that team was friendly and made sure each day to explain what they were working on and how long they anticipated that day’s activities would take. They were patient as we worked through a few logistical issues related to parking on campus and other than leaving behind a wonderful new set of shelving, you would not have known they were here owing to how well they cleaned up the jobsite.]
  ] else if marketCat.get() == "military" [
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Logistics Officer])])[Although I was completely shocked with the short notice on delivery, I am extremely pleased with how everything worked out. Your crew was awesome, got everything done quicker than I anticipated.  If you or your crew ever want to visit West Point feel free to let me know and I can arrange their visit.]
  ] else if marketCat.get() == "museum" [
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Museum Client])])[I can't tell you how pleased we are with the work that Tom, Lacey and Jose did for us during the installation of the system. They were pleasant, professional, and consistently "working smart" during the whole project. And then they left the place clean and with tips for how to make sure it continues to give us good service for many years. A stellar crew. Thanks to all for a perfect install.]
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Executive Director West Point Museum])])[The Spacesaver/Viking Archival storage cabinets have been delivered and installed! They look fantastic!
    
    Thank you for your assistance in this procurement. The Curators are thrilled and we look forward to working with you again in the future.]
  ] else if marketCat.get() == "publicsafety" [
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Chief of Police])])[Your crew finished up yesterday afternoon. I’d like to let you know how much we appreciated their speed and professionalism with the installation. It looked like a huge job to us, but they made it look easy
    Thanks for all your help and looking forward to working with you with future projects.]
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Chief of Police])])[I just wanted to send a quick note thanking you for your assistance with our locker project at the Millbury Police Department. This was a seamless process from start to finish. Your measurements of the locker rooms and fitting as many lockers as we could were spot on. Your company honored the initial pricing while I secured funding from the town, which did not happen overnight. Tom and the rest of the installation team were outstanding! They were neat and organized and had 32 lockers installed within 3 days. Tom also took the time to explain how the shelves could be adjusted and provided information on how to avoid damaging the locker by closing the boot drawer first before securing the locker door. I will certainly recommend Donnegan Systems to any Chief that is looking to upgrade their lockers.]
  ] else [
    #quote(block: true, attribution: [#emph(text(size: 12pt)[Chief Probation Officer])])[  I just wanted to say a HUGE thank you to you and your team.  They were AMAZING!  They finished well ahead of schedule and the place not only looks amazing, but it is so much more organized and it has freed up so much more storage space< I honestly can’t believe it.  Please pass along our gratefulness to your team. 

    I know the next steps is to now get the side tabbed files and the printer/label maker.  Do you have any idea when that will happen?  We are now just putting all of the closed files aside until we get these so that we can file them properly in our new system!  Anyway, let me know.  And Happy Thanksgiving to you and your family.]
  ]
}
