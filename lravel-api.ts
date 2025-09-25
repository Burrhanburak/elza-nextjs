// Laravel API Configuration - Direct connection to Laravel backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || (
  process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com/api' 
    : 'https://elza-darya.test/api'
);

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

// Type Definitions
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

export interface Poem {
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
  paddle_product_id?: string;
  language: string;
  created_at: string;
  updated_at: string;
}

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
  paddle_product_id?: string;
  language: string;
  created_at: string;
  updated_at: string;
}

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

// HTTP Client Configuration
const createHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
});

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    let errorText = '';
    try {
      errorText = await response.text();
    } catch (e) {
      errorText = 'Could not read error response';
    }
    
    console.error('❌ API Error Details:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      errorText,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    throw new Error(`HTTP ${response.status} ${response.statusText}: ${errorText}`);
  }
  
  try {
    const data = await response.json();
    console.log('✅ API Success:', { url: response.url, dataKeys: Object.keys(data) });
    return data;
  } catch (e) {
    console.error('❌ JSON Parse Error:', e);
    throw new Error('Invalid JSON response from API');
  }
};

// Base API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string, params?: Record<string, string | number>, revalidate: number = 300): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    console.log('🔗 API GET Request:', {
      url: url.toString(),
      baseUrl: this.baseUrl,
      endpoint,
      params,
      NODE_ENV: process.env.NODE_ENV,
      API_URL_ENV: process.env.NEXT_PUBLIC_API_URL
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        next: { revalidate }, // Dynamic revalidation time
        headers: createHeaders(),
      });

      console.log('📡 API Response:', {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        ok: response.ok
      });

      return handleResponse<T>(response);
    } catch (error) {
      console.error('❌ API GET Error:', error);
      throw error;
    }
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      next: { revalidate: 0 }, // POST istekleri cache'lenmesin
      headers: createHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return handleResponse<T>(response);
  }
}

// API Client Instance
const apiClient = new ApiClient(API_BASE_URL);

// Log API configuration for debugging
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 API Configuration:', {
    baseUrl: API_BASE_URL,
    environment: process.env.NODE_ENV,
    hasApiUrl: !!process.env.NEXT_PUBLIC_API_URL
  });
}

// Blog API
export const blogApi = {
  async getBlogs(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Blog[]>> {
    return apiClient.get('/blogs', params, 300); // 5 minutes
  },

  async getBlog(slug: string): Promise<ApiResponse<Blog>> {
    if (!slug?.trim()) {
      throw new Error('Blog slug is required');
    }
    return apiClient.get(`/blogs/${encodeURIComponent(slug)}`, undefined, 600); // 10 minutes
  },

  async getFeaturedBlogs(): Promise<ApiResponse<Blog[]>> {
    return apiClient.get('/blogs/featured', undefined, 600); // 10 minutes
  }
};

// Poem API
export const poemApi = {
  async getPoems(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Poem[]>> {
    return apiClient.get('/poems', params, 300); // 5 minutes
  },

  async getPoem(slug: string): Promise<ApiResponse<Poem>> {
    if (!slug?.trim()) {
      throw new Error('Poem slug is required');
    }
    return apiClient.get(`/poems/${encodeURIComponent(slug)}`, undefined, 600); // 10 minutes
  },

  async getFeaturedPoems(): Promise<ApiResponse<Poem[]>> {
    return apiClient.get('/poems/featured', undefined, 600); // 10 minutes
  }
};

// Book API
export const bookApi = {
  async getBooks(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
    min_price?: number;
    max_price?: number;
  }): Promise<ApiResponse<Book[]>> {
    return apiClient.get('/books', params, 300); // 5 minutes
  },

  async getBook(slug: string): Promise<ApiResponse<Book>> {
    if (!slug?.trim()) {
      throw new Error('Book slug is required');
    }
    return apiClient.get(`/books/${encodeURIComponent(slug)}`, undefined, 600); // 10 minutes
  },

  async getFeaturedBooks(): Promise<ApiResponse<Book[]>> {
    return apiClient.get('/books/featured', undefined, 600); // 10 minutes
  }
};

// Certificate API
export const certificateApi = {
  async getCertificates(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Certificate[]>> {
    return apiClient.get('/certificates', params, 600); // 10 minutes
  },

  async getCertificate(slug: string): Promise<ApiResponse<Certificate>> {
    if (!slug?.trim()) {
      throw new Error('Certificate slug is required');
    }
    return apiClient.get(`/certificates/${encodeURIComponent(slug)}`, undefined, 3600); // 1 hour
  },

  async getFeaturedCertificates(): Promise<ApiResponse<Certificate[]>> {
    return apiClient.get('/certificates/featured', undefined, 1800); // 30 minutes
  }
};

// Award API
export const awardApi = {
  async getAwards(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Award[]>> {
    return apiClient.get('/awards', params, 600); // 10 minutes
  },

  async getAward(slug: string): Promise<ApiResponse<Award>> {
    if (!slug?.trim()) {
      throw new Error('Award slug is required');
    }
    return apiClient.get(`/awards/${encodeURIComponent(slug)}`, undefined, 3600); // 1 hour
  },

  async getFeaturedAwards(): Promise<ApiResponse<Award[]>> {
    return apiClient.get('/awards/featured', undefined, 1800); // 30 minutes
  }
};

// Category API
export const categoryApi = {
  async getCategories(params?: {
    page?: number;
    per_page?: number;
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Category[]>> {
    return apiClient.get('/categories', params, 1800); // 30 minutes
  },

  async getCategory(slug: string): Promise<ApiResponse<Category>> {
    if (!slug?.trim()) {
      throw new Error('Category slug is required');
    }
    return apiClient.get(`/categories/${encodeURIComponent(slug)}`, undefined, 3600); // 1 hour
  },

  async getFeaturedCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get('/categories/featured', undefined, 1800); // 30 minutes
  }
};

// Unified Product API
export const productApi = {
  async getProducts(params?: {
    page?: number;
    per_page?: number;
    type?: 'book' | 'poem';
    language?: string;
    search?: string;
  }): Promise<ApiResponse<Product[]>> {
    return apiClient.get('/v1/products', params);
  },

  async getProduct(id: string): Promise<ApiResponse<Product>> {
    if (!id?.trim()) {
      throw new Error('Product ID is required');
    }
    return apiClient.get(`/v1/products/${encodeURIComponent(id)}`);
  },

  async createCheckout(productId: number, email: string): Promise<{ checkout_url: string }> {
    if (!productId || !email?.trim()) {
      throw new Error('Product ID and email are required');
    }
    return apiClient.post(`/v1/checkout/${productId}`, { email });
  }
};

// Checkout API
export const checkoutApi = {
  async createPoemCheckout(poemId: number, email: string): Promise<{ success: boolean; checkout_url: string }> {
    if (!poemId || !email?.trim()) {
      throw new Error('Poem ID and email are required');
    }
    
    const response = await apiClient.post<{ success: boolean; checkout_url: string }>(`/v1/checkout/poem/${poemId}`, { email });
    
    if (!response.success || !response.checkout_url) {
      throw new Error('Checkout creation failed: Invalid response from server');
    }
    
    return response;
  },

  async createBookCheckout(bookId: number, email: string): Promise<{ success: boolean; checkout_url: string }> {
    if (!bookId || !email?.trim()) {
      throw new Error('Book ID and email are required');
    }
    
    const response = await apiClient.post<{ success: boolean; checkout_url: string }>(`/v1/checkout/book/${bookId}`, { email });
    
    if (!response.success || !response.checkout_url) {
      throw new Error('Checkout creation failed: Invalid response from server');
    }
    
    return response;
  }
};

// Download API
export const downloadApi = {
  async verifyAccess(type: 'book' | 'poem', id: number, email: string): Promise<unknown> {
    if (!type || !id || !email?.trim()) {
      throw new Error('Type, ID, and email are required');
    }
    return apiClient.post(`/v1/download/${type}/${id}`, { email });
  }
};

// Generic API utilities
export const api = {
  get: <T>(endpoint: string) => apiClient.get<T>(endpoint),
  post: <T>(endpoint: string, data?: unknown) => apiClient.post<T>(endpoint, data)
};