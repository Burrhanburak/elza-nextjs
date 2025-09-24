// Next.js API Base URL (using our new API routes)
const API_BASE_URL = '/api';

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

// Category Types
export interface Category {
  id: number;
  name_tr: string;
  name_en: string;
  name_ru: string;
  name_az: string;
  slug: string;
  color: string;
  created_at: string;
  updated_at: string;
}

// Blog Types
export interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  cover_image?: string;
  cover_image_filename?: string;
  published_at: string;
  language: string;
  created_at: string;
  updated_at: string;
  categories?: Category[];
}

// Product Types (Unified)
export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  type: 'book' | 'poem';
  language: string;
  price: number;
  paddle_product_id?: string;
  cover_image?: string;
  preview_pdf?: string;
  full_pdf?: string;
  cover_image_url?: string;
  preview_url?: string;
  full_file_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Legacy support
export interface Poem extends Product {}
export interface Book extends Product {}

// Certificate Types
export interface Certificate {
  id: number;
  name: string;
  slug: string;
  description: string;
  file_url?: string;
  file_url_filename?: string;
  language: string;
  created_at: string;
  updated_at: string;
}

// Award Types
export interface Award {
  id: number;
  name: string;
  slug: string;
  description: string;
  file_url?: string;
  file_url_filename?: string;
  language: string;
  created_at: string;
  updated_at: string;
}

// Book Types
export interface Book {
  id: number;
  title: string;
  slug: string;
  description: string;
  cover_image?: string;
  preview_pdf?: string;
  full_pdf?: string;
  cover_image_filename?: string;
  preview_pdf_filename?: string;
  full_pdf_filename?: string;
  price: number;
  paddle_price_id?: string;
  paddle_product_id?: string
  language: string;
  created_at: string;
  updated_at: string;
}

// Product API (Unified)
export const productApi = {
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    type?: 'book' | 'poem';
    paddle_product_id?: string;
    paddle_price_id?: string;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Product[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.type) searchParams.append('type', params.type);
    if (params?.language) searchParams.append('language', params.language);
    if (params?.search) searchParams.append('search', params.search);

    const url = `${API_BASE_URL}/v1/products${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    console.log('Product API Request URL:', url);
    
    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Product API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Product API Response Data:', data);
      return data;
    } catch (error) {
      console.error('Product API Request Error:', error);
      throw error;
    }
  },

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    const response = await fetch(`${API_BASE_URL}/v1/products/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async createCheckout(productId: number, email: string): Promise<{checkout_url: string}> {
    const response = await fetch(`${API_BASE_URL}/v1/checkout/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Checkout creation failed');
    }
    
    return response.json();
  }
};

// Legacy API support
export const blogApi = {
  // Get all blogs with pagination and filters
  // Now handled by Next.js API route: /api/blogs
  async getBlogs(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Blog[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.language) searchParams.append('language', params.language);
    if (params?.search) searchParams.append('search', params.search);

    const url = `${API_BASE_URL}/blogs${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    // console.log('API Request URL:', url);
    // console.log('API Base URL:', API_BASE_URL);
    
    try {
      const response = await fetch(url);
      
      // console.log('API Response Status:', response.status);
      // console.log('API Response Headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      // console.log('API Response Data:', data);
      return data;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  },

  // Get single blog by slug
  async getBlog(slug: string): Promise<ApiResponse<Blog>> {
    const response = await fetch(`${API_BASE_URL}/blogs/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Blog not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  // Get featured blogs
  async getFeaturedBlogs(): Promise<ApiResponse<Blog[]>> {
    const response = await fetch(`${API_BASE_URL}/blogs/featured`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

// Poem API Functions
export const poemApi = {
  async getPoems(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Poem[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.language) searchParams.append('language', params.language);
    if (params?.search) searchParams.append('search', params.search);

    const url = `${API_BASE_URL}/poems${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    console.log('Poem API Request URL:', url);
    console.log('Poem API Base URL:', API_BASE_URL);
    
    try {
      const response = await fetch(url);
      
      console.log('Poem API Response Status:', response.status);
      console.log('Poem API Response Headers:', response.headers);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Poem API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Poem API Response Data:', data);
      return data;
    } catch (error) {
      console.error('Poem API Request Error:', error);
      throw error;
    }
  },

  async getPoem(slug: string): Promise<ApiResponse<Poem>> {
    if (!slug || slug.trim() === '') {
      throw new Error('Invalid poem slug');
    }
    
    const response = await fetch(`${API_BASE_URL}/poems/${encodeURIComponent(slug)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Poem not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getFeaturedPoems(): Promise<ApiResponse<Poem[]>> {
    const response = await fetch(`${API_BASE_URL}/poems/featured`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

// Certificate API Functions
export const certificateApi = {
  async getCertificates(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Certificate[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.language) searchParams.append('language', params.language);
    if (params?.search) searchParams.append('search', params.search);

    const url = `${API_BASE_URL}/certificates${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getCertificate(slug: string): Promise<ApiResponse<Certificate>> {
    const response = await fetch(`${API_BASE_URL}/certificates/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Certificate not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getFeaturedCertificates(): Promise<ApiResponse<Certificate[]>> {
    const response = await fetch(`${API_BASE_URL}/certificates/featured`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

// Award API Functions
export const awardApi = {
  async getAwards(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Award[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.language) searchParams.append('language', params.language);
    if (params?.search) searchParams.append('search', params.search);

    const url = `${API_BASE_URL}/awards${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getAward(slug: string): Promise<ApiResponse<Award>> {
    const response = await fetch(`${API_BASE_URL}/awards/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Award not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getFeaturedAwards(): Promise<ApiResponse<Award[]>> {
    const response = await fetch(`${API_BASE_URL}/awards/featured`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

// Book API Functions
export const bookApi = {
  async getBooks(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
  }): Promise<ApiResponse<Book[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.language) searchParams.append('language', params.language);
    if (params?.search) searchParams.append('search', params.search);
    if (params?.min_price) searchParams.append('min_price', params.min_price.toString());
    if (params?.max_price) searchParams.append('max_price', params.max_price.toString());

    const url = `${API_BASE_URL}/books${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getBook(slug: string): Promise<ApiResponse<Book>> {
    
    if (!slug || slug.trim() === '') {
      throw new Error('Invalid book slug');
    }
    
    const response = await fetch(`${API_BASE_URL}/books/${encodeURIComponent(slug)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Book not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getFeaturedBooks(): Promise<ApiResponse<Book[]>> {
    const response = await fetch(`${API_BASE_URL}/books/featured`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

// Download API functions
export const downloadApi = {
  async verifyAccess(type: 'book' | 'poem', id: number, email: string) {
    const response = await fetch(`${API_BASE_URL}/v1/download/${type}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      throw new Error('Download verification failed');
    }
    
    return response.json();
  }
};

// Checkout API functions
export const checkoutApi = {
  async createPoemCheckout(poemId: number, email: string) {
    const response = await fetch(`${API_BASE_URL}/v1/checkout/poem/${poemId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Checkout creation failed: ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    if (!data.success || !data.checkout_url) {
      throw new Error(`Checkout creation failed: Checkout URL not received from Paddle. Response: ${JSON.stringify(data)}`);
    }
    
    return data;
  },

  async createBookCheckout(bookId: number, email: string) {
    const response = await fetch(`${API_BASE_URL}/v1/checkout/book/${bookId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Checkout creation failed: ${errorData.message || 'Unknown error'}`);
    }
    
    const data = await response.json();
    
    if (!data.success || !data.checkout_url) {
      throw new Error(`Checkout creation failed: Checkout URL not received from Paddle. Response: ${JSON.stringify(data)}`);
    }
    
    return data;
  }
};

// Category API Functions
export const categoryApi = {
  async getCategories(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Category[]>> {
    const searchParams = new URLSearchParams();
    
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString());
    if (params?.language) searchParams.append('language', params.language);
    if (params?.search) searchParams.append('search', params.search);

    const url = `${API_BASE_URL}/categories${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getCategory(slug: string): Promise<ApiResponse<Category>> {
    const response = await fetch(`${API_BASE_URL}/categories/${slug}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Category not found');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async getFeaturedCategories(): Promise<ApiResponse<Category[]>> {
    const response = await fetch(`${API_BASE_URL}/categories/featured`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};

// Generic API utility functions
export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  }
};
