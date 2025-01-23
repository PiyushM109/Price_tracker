const Product = require("./../models/amazonProduct.js");

const fetchAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length == 0) {
      return res.status(404).json({
        success: false,
        message: "not able to fetch product list",
        products: products,
      });
    }
    return res.status(200).json({
      success: true,
      message: "products fetched successfully",
      products: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong please try agian later",
    });
  }
};

const getProductbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "product with given id is not found",
        product,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product with given id found successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong please try again later",
    });
  }
};

const addEmailToProduct = async (req, res) => {
  try {
    const { userEmail, prodId } = req.body;

    const product = await Product.findById(prodId);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "document not found",
      });
    }
    const emailExists = product.users.some((user) => user.email === userEmail);
    if (emailExists) {
      //   console.log("Email already exists in the users array");
      res
        .status(500)
        .send({ message: "Email already exists in the users array" });
      return;
    } else {
      // Step 3: If email doesn't exist, add it to the users array
      product.users.push({ email: userEmail });
    }
    const emailContent = await generateEmailBody(doc, "WELCOME");
    await sendEmail(emailContent, [userEmail]);
    await product.save();
    res.status(200).json({
      success: true,
      message: "Product updated and saved successfully",
      product,
    });

    // Product.findById(prodId)
    //   .then(async (doc) => {
    //     if (!doc) {
    //       throw new Error("Document not found");
    //     }
    //     const emailExists = doc.users.some((user) => user.email === userEmail);
    //     if (emailExists) {
    //       console.log("Email already exists in the users array");
    //       res
    //         .status(500)
    //         .send({ message: "Email already exists in the users array" }); // Send response here
    //       return;
    //     } else {
    //       // Step 3: If email doesn't exist, add it to the users array
    //       doc.users.push({ email: userEmail });
    //     }
    //     const emailContent = await generateEmailBody(doc, "WELCOME");
    //     console.log(emailContent);
    //     await sendEmail(emailContent, [userEmail]);
    //     return doc.save();
    //   })
    //   .then((updatedDoc) => {
    //     if (updatedDoc) {
    //       console.log("User email added to users array:", updatedDoc);
    //       res.send(updatedDoc); // Send response here
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     res.status(500).send({ error: "Internal server error" }); // Send error response here
    //   });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong please try again later",
    });
  }
};
