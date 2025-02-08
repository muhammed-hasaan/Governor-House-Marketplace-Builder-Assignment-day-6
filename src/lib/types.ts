export interface CategoryRef {
  _type: "reference";
  _ref: string; // Reference ID of the category
}

export interface Slug {
  _type: "slug";
  current: string; // The actual slug (URL-friendly string)
}
export interface Category {
  name: string;
  _id: string;
  _updatedAt: string;
  slug: Slug;
  _createdAt: string;
  _rev: string;
  _type: string;
}

export interface ImageAsset {
  _type: "reference";
  _ref: string; // Reference ID of the image asset
}

export interface Image {
  _type: "image";
  asset: ImageAsset;
}

export interface Dimensions {
  _type: "dimensions";
  height: string;
  width: string;
  depth: string;
}

export interface Product {
  _id: string;
  _type: "product";
  name: string;
  category: CategoryRef;
  slug: Slug;
  features: string[];
  dimensions: Dimensions;
  image?: Image; // Optional, as it might not be provided
  quantity: number;
  description: string;
  price: number;
  tags: string[];
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}
