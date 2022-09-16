import Product from '../../../collections/products';

export const create = async (name) => {
  const data = await Product.create({ name });
  return data;
};

export const updateProduct = async (productId, payload) => {
  const currentProduct = await Product.findById(productId);
  if (payload['name']) currentProduct.name = payload['name'];
  if (payload['items']) currentProduct.items = payload['items'];
  currentProduct.save();

  return true;
};

export const deleteProduct = async (productId) => {
  await Product.findByIdAndDelete(productId);
  return true;
};

export const getAll = async () => {
  const data = await Product.find();
  return data;
};
