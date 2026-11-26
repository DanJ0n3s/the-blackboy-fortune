/* products.js: the ONE place every product lives.
   Change a price, size, colour, picture or production time here and the shop, cart,
   orders and WhatsApp message all follow. Prices are in naira (NGN). */
(function () {
  // Size lists: letters for tops, waist numbers for bottoms, one size for caps.
  var TOPS = ['XS', 'S', 'M', 'L', 'XL', 'XXL+'];
  var MALE = ['28', '30', '32', '34', '36', '38+'];
  var FEMALE = ['22', '24', '27', '30', '33', '36+'];
  var ONE = ['One size'];

  var IMG = 'assets/img/products/';
  // Helper: one colour = name, swatch colour, picture file (no extension needed).
  function c(name, hex, file) { return { name: name, hex: hex, img: IMG + file + '.jpg' }; }

  window.PRODUCTS = [
    { id: 'tee', cat: 'tees', name: 'Round neck tee', price: 35000, time: '1-5 days', sizes: TOPS,
      colors: [c('Black', '#111111', 'tee-black'), c('Purple', '#6b3fa0', 'tee-purple'), c('White', '#f4f4f0', 'tee-white')] },
    { id: 'cap', cat: 'caps', name: 'Cap', price: 25000, time: '2 weeks', sizes: ONE,
      colors: [c('Red', '#d62020', 'cap-red'), c('Black', '#111111', 'cap-black'), c('Green', '#0f4a35', 'cap-green'), c('Navy', '#1b2a5a', 'cap-navy')] },
    // frontBack: the picture shows front and back, so the shop marks "Front" and "Back" above or below it.
    { id: 'tracksuit', cat: 'tracksuits', name: 'Tracksuit', price: 90000, time: '2 weeks', sizes: TOPS, frontBack: true,
      colors: [c('White and red', '#f4f4f0', 'tracksuit-white'), c('Green', '#0a9a3a', 'tracksuit-green'), c('Black and red', '#111111', 'tracksuit-black'), c('Navy', '#0b0b55', 'tracksuit-navy'), c('Lavender', '#c9b8e3', 'tracksuit-lavender')] },
    { id: 'sweater-collar', cat: 'sweaters', name: 'Collared sweater', price: 55000, time: '1-5 days', sizes: TOPS,
      colors: [c('Black', '#111111', 'sweater-collar-black'), c('Green', '#0f6b3a', 'sweater-collar-green'), c('Orange', '#f5821f', 'sweater-collar-orange'), c('White', '#f4f4f0', 'sweater-collar-white')] },
    { id: 'sweater-plain', cat: 'sweaters', name: 'Sweater, no collar', price: 55000, time: '1-5 days', sizes: TOPS,
      colors: [c('Black', '#111111', 'sweater-plain-black'), c('Cream', '#efe8d6', 'sweater-plain-cream')] },
    { id: 'sleeveless', cat: 'sleeveless', name: 'Sleeveless shirt', price: 30000, time: '1-5 days', sizes: TOPS,
      colors: [c('Black', '#111111', 'sleeveless-black'), c('White', '#f4f4f0', 'sleeveless-white')] },
    { id: 'jorts', cat: 'bottoms', name: 'Jean shorts (jorts)', price: 40000, time: '2 weeks', sizes: MALE,
      colors: [c('Black', '#111111', 'jorts-black')] },
    { id: 'skirt', cat: 'bottoms', name: 'Denim mini skirt', price: 30000, time: '2 weeks', sizes: FEMALE,
      colors: [c('Black', '#111111', 'skirt-black'), c('Purple', '#4a2a5a', 'skirt-purple')] }
  ];

  // Shown on every product and repeated in the WhatsApp order message.
  window.PRE_ORDER_NOTE = 'Made to order. Pre-order early so it is ready when you need it.';
})();
