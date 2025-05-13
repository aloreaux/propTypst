#let _today = datetime.today().display("[month repr:long] [day], [year repr:full]")
#let donn-black = rgb(35,31,32, 80%)
#let donn-blue = rgb(36,80,159)
#let donn-fax = "508-393-3974"
#let donn-web = "www.donnegan.com"
#let donn-name = "Donnegan Systems, Inc."
#let donn-address = "170 Bartlett Street"
#let donn-city = "Northborough"
#let donn-state = "MA"
#let donn-zip = "01532"

#let title-state = state("title", "")
#let author-state = state("author","")
#let customer-state = state("customer", "")
#let equip-state = state("equip", "")
#let address-state = state("address", "")
#let city-state = state("city", "")
#let state-state = state("state", "")
#let zip-state = state("zip", "")
#let ext-state = state("ext", "")
#let cell-state = state("cell", "")
#let summary-state = state("summary", "")
#let invest-state = state("invest", "")
#let quantity-state = state("quantity", "")
#let carriageCost = state("carriageCost", "")
#let lumpSumBool = state("lumpSumBool", "")
#let marketCat = state("marketCat", "")
#let off52 = state("off52", "")
#let fac126 = state("fac126", "")
#let gsa71 = state("gsa71", "")
#let gsa84 = state("gsa84", "")
#let mhec = state("mhec", "")
#let ny = state("ny", "")

#let setup(
    title: none,
    author: none,
    customer: none,
    address: none,
    state: none,
    city: none,
    zip: none,
    ext: none,
    cell: none,
    cat: none,
) = {
    title-state.update(title)
    author-state.update(author)
    customer-state.update(customer)
    address-state.update(address)
    state-state.update(state)
    city-state.update(city)
    zip-state.update(zip)
    ext-state.update(ext)
    cell-state.update(cell)
    marketCat.update(cat)
}

#let conf(
    cornerimgpath: none,
    equip: none,
    summary: none,
    invest: none,
    quantity: none,
    carriage: none,
    lump: none,
    off52Bool: none,
    fac126Bool: none,
    gsa71Bool: none,
    gsa84Bool: none,
    mhecBool: none,
    nyBool: none,
    doc
) = {
    set page("us-letter")
    set text(font: "Concourse T2", size: 16pt)
    set heading(numbering: "1.")
    show heading.where(level: 1): it => {
        set align(right)
        if it.numbering != none {
            pad(top: 40%, bottom: 10%)[
            #set text(font: "Concourse C2", weight: "thin", size: 96pt)
            #counter(heading).display("1")]
        }
        set text(font: "Concourse C2", weight: "regular", size: 24pt)
        it.body
    }
    set page(
        margin: 0in,
        header:
            place(
                dx: -15.5%,
                image(
                    cornerimgpath,
                    width: 10%
                )
        )
    )
    set page(margin: 1in)
    equip-state.update(equip)
    summary-state.update(summary)
    invest-state.update(invest)
    quantity-state.update(quantity)
    carriageCost.update(carriage)
    lumpSumBool.update(lump)
    off52.update(off52Bool)
    fac126.update(fac126Bool)
    gsa71.update(gsa71Bool)
    gsa84.update(gsa84Bool)
    mhec.update(mhecBool)
    ny.update(nyBool)
    doc
}

#let adaptive_title(t) = {
    let base_size = 48pt      // Default title font size
    let min_size = 24pt       // Minimum font size
    let max_width = 190pt     // Maximum height for 2 lines
    let final_size = 0pt

    // Measure the text at the base size
    let measured_size = measure(text[#t])

    let mwidth = measured_size.width

    final_size = if mwidth > max_width {
      calc.max(base_size * (max_width / mwidth), min_size)
    } else {
      base_size
    } 

    // Return the resized text
    text(size: final_size)[#t]
}

#let adaptive_cover(t) = {
    let base_size = 36pt      // Default cover font size
    let min_size = 24pt       // Minimum font size
    let max_width = 180pt     // Maximum height for 2 lines
    let final_size = 0pt

    // Measure the text at the base size
    let measured_size = measure(text[#t])

    let mwidth = measured_size.width

    final_size = if mwidth > max_width {
      calc.max(base_size * (max_width / mwidth), min_size)
    } else {
      base_size
    } 

    // Return the resized text
    text(size: final_size)[#t]
}

#let adaptive_project(t) = {
    let base_size = 16pt      // Default cover font size
    let min_size = 10pt       // Minimum font size
    let max_width = 315pt     // Maximum height for 2 lines
    let final_size = 0pt

    // Measure the text at the base size
    let measured_size = measure(text[#t])

    let mwidth = measured_size.width

    final_size = if mwidth > max_width {
      calc.max(base_size * (max_width / mwidth), min_size)
    } else {
      base_size
    } 

    // Return the resized text
    text(size: final_size)[#t]
}

#let makecover(
    imgpath: none,
) = {
    // Set up the page dimensions and default styling
    set page(
        margin: 0in, 
        background: place(
            bottom + left,
            image(
                imgpath,
                width: 8.5in,
                height: 11in
                //width: 612pt,
                //height: 918.238pt
            )
        )
    )

    move(
        dy: 4.75cm,
        rect(width: 100%, fill: donn-black)[#pad(left: 3%, right: 3%, top: 12.5%, bottom: 12.5%, )[
            #context{
                par(leading: 0.4em)[#text(font: "Concourse C4", weight: "bold", fill: donn-blue)[#adaptive_title(title-state.get())]]
                text(font: "Concourse C2", size: 22pt, fill: white)[#author-state.get()\ ]
                text(font: "Concourse C2", size: 22pt, fill: white)[#_today]
            }
        ]]
    )

    place(
        bottom + left,
        dx: 2%,
        dy: -1.5%,
        image(
            "assets/donnegan-allwhite.png",
            width: 27.5%
        )
    )
}

#let add_commas(n) = {
  let s = str(n)
  let result = ""
  let len = s.len()
  for i in range(len) {
    if i > 0 and calc.rem(len - i, 3) == 0 {
      result += ","
    }
    result += s.at(i)
  }
  result
}


#let pad_zeros(n, width) = {
  let s = str(n)
  if s.len() < width {
    return "0" * (width - s.len()) + s
  }
  return s
}

#let format_dollars(amount) = {
  let amount = amount * 100 // convert to cents
  let dollars = calc.floor(amount / 100)
  let cents = calc.round(((amount / 100) - dollars) * 100)
  let formatted = add_commas(dollars)
  return "$" + formatted + "." + pad_zeros(calc.round(cents), 2)
}
