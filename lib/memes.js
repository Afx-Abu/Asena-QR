var Jimp = require("jimp");
var path = require("path");

module.exports = function (options, callback) {
  try {
    let url = options.imageURL;
    let directory = "./";
    let fileName = "fileName" in options ? options.fileName : "random";
    let top_Pos = "top_Pos" in options ? options.top_Pos : 5;
    let bot_Pos = "bot_Pos" in options ? options.bot_Pos : 45;
    Jimp.read(url, (err, image) => {
      if (err)
        return callback({
          status: 400,
          error: "Invalid image URL",
        });
      const fileTypes = ["png", "jpg", "jpeg"];
      if (!fileTypes.includes(image.getExtension())) {
        return callback({
          status: 400,
          error: `Invalid image type, gif's are not allowed.`,
        });
      }
      if (image.bitmap.height < 100 || image.bitmap.width < 100) {
        image.scale(10);
      }
      if(top_Pos<5){
        top_Pos = 5
      }
      if(bot_Pos<45){
        bot_Pos = 45
      }
      const TOP_POS = top_Pos;
      const BOTTOM_POS = image.bitmap.height - bot_Pos;

      Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then((font) => {
        image.print(
          font,
          0,
          TOP_POS,
          {
            text: options.topText.toUpperCase(),
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          image.bitmap.width,
          image.bitmap.height
        );
        image.print(
          font,
          0,
          BOTTOM_POS,
          {
            text: options.bottomText.toUpperCase(),
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
          },
          image.bitmap.width,
          image.bitmap.height
        );
        console.log(image.bitmap.width,
          image.bitmap.height)
        if (fileName == "random") {
          let randNum = Math.floor(Math.random() * 1000000000 + 1);
          image.write(`meme_${randNum}.` + image.getExtension());
          return callback({
            status: 200,
            fileName: `${directory}meme_${randNum}.` + image.getExtension(),
          });
        } else {
          image.write(`./${fileName}.` + image.getExtension());
          return callback({
            status: 200,
            fileName: `${directory}${fileName}.` + image.getExtension(),
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    return callback({
      status: 400,
      error: "Something went wrong while creating image: " + error,
    });
  }
};
