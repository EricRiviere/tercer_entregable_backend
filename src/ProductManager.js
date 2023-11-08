import Product from "./Product.js";
import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    if (fs.existsSync(this.path)) {
      try {
        let products = fs.readFileSync(this.path, "utf-8");
        this.products = JSON.parse(products);
      } catch {
        this.products = [];
      }
    } else {
      this.products = [];
    }
  }

  async saveFile() {
    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(this.products, null, "\t")
      );
    } catch (error) {
      console.log(`Error saving products file: ${error}`);
    }
  }

  async addProduct(product) {
    let existingProduct = this.products.find(
      (prod) => prod.code === product.code
    );
    if (!existingProduct) {
      let productId;
      this.products.length > 0
        ? (productId = this.products[this.products.length - 1].id + 1)
        : (productId = 1);
      let newProduct = { id: productId, ...product };
      this.products.push(newProduct);
      await this.saveFile();
      console.log(`Product "${product.title}" added to products list.`);
    } else {
      console.log(
        `The product "${product.title}" is already on the products list.`
      );
    }
  }

  getProducts() {
    console.log(this.products);
  }

  findProductById(id) {
    return this.products.find((product) => product.id === id);
  }

  getProductsById(id) {
    let profuctFound = this.findProductById(id);
    if (!profuctFound) {
      console.log(`No product found with id "${id}".`);
    } else {
      console.log(profuctFound);
    }
  }

  async updateProduct(id, updateData) {
    let productToUpdate = this.findProductById(id);

    if (!productToUpdate) {
      console.log(`No product to update with id "${id}".`);
    } else {
      for (const key in updateData) {
        if (Object.prototype.hasOwnProperty.call(updateData, key)) {
          productToUpdate[key] = updateData[key];
        } else {
          console.log("Error updating product, invalid property");
        }
      }
      await this.saveFile();
      console.log(`Product with id "${id}" updated.`);
    }
  }

  async deleteProduct(id) {
    let productToDelete = this.findProductById(id);

    if (!productToDelete) {
      console.log(`No product to delete with id "${id}".`);
    } else {
      let productsUpdated = this.products.filter((product) => product.id != id);
      this.products = productsUpdated;
      await this.saveFile();
      console.log("Product deleted");
    }
  }
}

// const createProductsList = async () => {
//   const asyncProductsList = new ProductManager("./ProductsList.json");

//   await asyncProductsList.addProduct(
//     new Product(
//       "Samsung Galaxy S21",
//       "Potente smartphone con cámara de alta resolución",
//       799.0,
//       "https://example.com/samsung-s21.jpg",
//       "SGS21",
//       50
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "iPhone 13",
//       "Último modelo de iPhone con pantalla OLED",
//       999.0,
//       "https://example.com/iphone-13.jpg",
//       "IP13",
//       30
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Google Pixel 5",
//       "Teléfono con enfoque en la fotografía y la experiencia Android",
//       699.0,
//       "https://example.com/google-pixel-5.jpg",
//       "GPX5",
//       40
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "OnePlus 9",
//       "Dispositivo con rendimiento ágil y carga rápida",
//       799.0,
//       "https://example.com/oneplus-9.jpg",
//       "OP9",
//       25
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Xiaomi Mi 11",
//       "Smartphone con potente procesador y cámara versátil",
//       649.0,
//       "https://example.com/xiaomi-mi-11.jpg",
//       "XMI11",
//       35
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Sony Xperia 5 III",
//       "Teléfono con enfoque en multimedia y entretenimiento",
//       999.0,
//       "https://example.com/sony-xperia-5-iii.jpg",
//       "SXP5III",
//       20
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Motorola Edge",
//       "Dispositivo con pantalla envolvente y características destacadas",
//       699.0,
//       "https://example.com/motorola-edge.jpg",
//       "MDR",
//       45
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Realme GT",
//       "Smartphone con alto rendimiento y carga rápida",
//       499.0,
//       "https://example.com/realme-gt.jpg",
//       "RLMGT",
//       60
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "LG Velvet",
//       "Dispositivo con diseño atractivo y características multimedia",
//       599.0,
//       "https://example.com/lg-velvet.jpg",
//       "LGVLT",
//       50
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "BlackBerry Key2",
//       "Teléfono con teclado físico y enfoque en la seguridad",
//       549.0,
//       "https://example.com/blackberry-key2.jpg",
//       "BBK2",
//       45
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Nokia 9 PureView",
//       "Smartphone con cámara de 5 lentes y calidad de imagen",
//       599.0,
//       "https://example.com/nokia-9-pureview.jpg",
//       "NKP9",
//       40
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Huawei P40",
//       "Dispositivo con cámara avanzada y rendimiento de gama alta",
//       699.0,
//       "https://example.com/huawei-p40.jpg",
//       "HWP40",
//       35
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Oppo Find X3",
//       "Teléfono con diseño elegante y potencia fotográfica",
//       799.0,
//       "https://example.com/oppo-find-x3.jpg",
//       "OPFX3",
//       30
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Vivo X60 Pro",
//       "Smartphone con estabilización de imagen y rendimiento fluido",
//       699.0,
//       "https://example.com/vivo-x60-pro.jpg",
//       "VVX60P",
//       25
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Lenovo Legion Duel 2",
//       "Dispositivo orientado al gaming con potencia y enfriamiento",
//       899.0,
//       "https://example.com/lenovo-legion-duel-2.jpg",
//       "LLD2",
//       20
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Redmi Note 10 Pro",
//       "Teléfono con gran autonomía y cámara de alta resolución",
//       299.0,
//       "https://example.com/redmi-note-10-pro.jpg",
//       "RN10P",
//       40
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Poco X3",
//       "Smartphone con batería de larga duración y rendimiento sólido",
//       249.0,
//       "https://example.com/poco-x3.jpg",
//       "PCX3",
//       50
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "ZTE Axon 30 Ultra",
//       "Dispositivo con cámara de 64 MP y rendimiento potente",
//       749.0,
//       "https://example.com/zte-axon-30-ultra.jpg",
//       "ZTA30U",
//       30
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "TCL 20 Pro 5G",
//       "Teléfono con cámara de 48 MP y diseño atractivo",
//       499.0,
//       "https://example.com/tcl-20-pro-5g.jpg",
//       "TCL20P",
//       35
//     )
//   );
//   await asyncProductsList.addProduct(
//     new Product(
//       "Cat S62 Pro",
//       "Smartphone resistente con cámara térmica y durabilidad",
//       649.0,
//       "https://example.com/cat-s62-pro.jpg",
//       "CTS62P",
//       20
//     )
//   );
// };
// createProductsList();
