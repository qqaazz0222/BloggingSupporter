text = "\n\n1. I recently bought a digital camera and I am very pleased with its performance. The image quality is excellent and it has a great range of features, making it perfect for my new hobby of flash photography. \n2. I also purchased a Reflex camera and several camera lenses to go with it, and I am very impressed with the clarity of the photos taken with this setup. \n3. I recently bought some camera accessories to extend the capabilities of my point-and-shoot camera. The extra flash, filters and tripod have allowed me to take much better photos in different conditions. \n4. I invested in a digital SLR for the more serious photography projects I am working on and I am extremely pleased with the quality of the photos I am producing. \n5. I recently purchased a new lens for my camera and it has vastly improved the quality of my photos, even in low light conditions. I am very happy with my purchase and would highly recommend it to anyone looking for an upgrade in their cameras & optics."
text = text.split("\n")
t = []
for i in text:
    if i != "" and i != "\n":
        t.append(i)
print(t)
