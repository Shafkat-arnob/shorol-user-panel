import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';



// const { default: axios } = require('axios');
// https://thingproxy.freeboard.io/fetch/ https://cors-anywhere.herokuapp.com/


const BASE_URL = 'https://rest.deoxysworkshop.com/api';
const BASE_URL_LOGIN = 'https://rest.deoxysworkshop.com/api';


const client_id = '4944b484-2be6-11ee-be56-0242ac120002-client';
const client_secret = '42d47ff7-44d4-4d23-8e0e-fb9d58ac70c9-secret';

export const IMAGE_PREFIX = 'http://146.190.110.177:8080/abc';

export const getImageUrl = (url)=> {
  return `${IMAGE_PREFIX}/${url}`;
}

//const access_token_header = sessionStorage.getItem('access_token');

const instance = axios.create({
  baseURL: BASE_URL,
});

const refreshAuthLogic = failedRequest =>
  instance
    .post(`${BASE_URL_LOGIN}/oauth/token`, null, {
      params: {
        grant_type: 'refresh_token',
        client_id,
        client_secret,
        refresh_token: sessionStorage.getItem('refresh_token'),
      },
    })
    .then(tokenRefreshResponse => {
      failedRequest.response.config.params['access_token'] =
        tokenRefreshResponse.data.access_token;
      sessionStorage.setItem(
        'access_token',
        tokenRefreshResponse.data.access_token
      );
      sessionStorage.setItem(
        'refresh_token',
        tokenRefreshResponse.data.refresh_token
      );

      return Promise.resolve();
    })
    .catch (() => {
      return Promise.reject();
    });

createAuthRefreshInterceptor(instance, refreshAuthLogic);

export const login = async data => {
  const fd = new FormData();
  fd.append('grant_type', 'password');
  fd.append('password', data.password);
  fd.append('username', data.username);
  fd.append('client_id', client_id);
  fd.append('client_secret', client_secret);
  return await axios.post(`${BASE_URL_LOGIN}/oauth/token`, fd);
};



//Axios.defaults.headers.common = {'Authorization': `Bearer ${sessionStorage.getItem("access_token")}`}

export const fileUpload = async (file) => {

  const access_token = sessionStorage.getItem('access_token');
  console.log("file------->",file);
  const fd = new FormData();
  fd.append('file', file);
  return await instance.post(`${BASE_URL}/all/upload/file`, fd,{
    //params: { access_token, client_id, client_secret },
  });
  
  
};

//roles APi

export const getAllRole = async () => {
  const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/admin/users/role/list`, {
    params: { access_token, client_id, client_secret },
  });
};

export const getRoles = async () => {
  const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/admin/users/role/list`, {
    params: { access_token, client_id, client_secret },
  })
};


// Users 
export const createUser = async data => {
  const access_token = sessionStorage.getItem('access_token');
  return await instance.post('/admin/users', data, {
    params: { access_token, client_id, client_secret },
  });
};
export const updateUser = async data => {
  const access_token = sessionStorage.getItem('access_token');
  return await instance.put('/admin/users/'+data.slug, data, {
    params: { access_token, client_id, client_secret },
  });
};
export const deleteUser = async slug => {
  const access_token = sessionStorage.getItem('access_token');
  return await instance.delete('/admin/users/'+slug,  {
    params: { access_token, client_id, client_secret },
  });
};

export const getAllUsersByRole = async (roleId) => {
  const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/admin/users/role/`+roleId, {
    params: { access_token, client_id, client_secret },
  });
};




//=================================== ecommerce apis ===================================//


export const createCategory = async data => {
  const access_token = sessionStorage.getItem('access_token');
  
  return await instance.post('/admin/category', data, {
    params: { access_token, client_id, client_secret },
  });
};

export const getAllCategoryList = async () => {
  const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/admin/category/get/all/`, {
    params: { access_token, client_id, client_secret },
  });
};

export const getCategoryListByParentId = async (params) => {

  return await instance.get(`/all/category/get/all/sub-category/by/category-id`, {
    params: {...params },
  });
};

export const createColor = async data => {
  const access_token = sessionStorage.getItem('access_token');
  
  return await instance.post('/admin/color', data, {
    params: { access_token, client_id, client_secret },
  });
};

export const getAllColorList = async () => {
  const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/admin/color`, {
    params: { access_token, client_id, client_secret },
  });
};

export const createSize = async data => {
  const access_token = sessionStorage.getItem('access_token');
  
  return await instance.post('/admin/size', data, {
    params: { access_token, client_id, client_secret },
  });
};

export const getAllSizeList = async () => {
  const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/admin/size`, {
    params: { access_token, client_id, client_secret },
  });
};

export const createBrand = async data => {
  const access_token = sessionStorage.getItem('access_token');
  
  return await instance.post('/admin/brand', data, {
    params: { access_token, client_id, client_secret },
  });
};

export const getAllBrandList = async () => {
  const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/all/brand`, {
    params: { access_token, client_id, client_secret },
  });
};

export const getBrandListByCategoryId = async (params) => {
  // const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/all/brand/get/by/category`, {
    params: { ...params },
  });
};

export const createProduct = async data => {
  const access_token = sessionStorage.getItem('access_token');
  
  return await instance.post('/admin/product', data, {
    params: { access_token, client_id, client_secret },
  });
};

export const getAllProductList = async () => {

  return await instance.get(`/all/product`, {
    params: { client_id, client_secret },
  });
};

export const getProductById = async (id) => {

  return await instance.get(`/all/product/${id}`, {
    params: { client_id, client_secret },
  });
}; 

export const getProductByCategoryAndColor = async (params) => {

  return await instance.get(`/all/product/get/by/category-name/color-name`, {
    params: { client_id, client_secret,...params },
  });
};

export const getNewArrivalProductList = async () => {

  return await instance.get(`/all/product/get/recent`, {
    params: { client_id, client_secret },
  });
  
};

export const createSlider = async data => {
  const access_token = sessionStorage.getItem('access_token');
  
  return await instance.post('/admin/slider-image', data, {
    params: { access_token, client_id, client_secret },
  });
};

export const getAllSliderList = async () => {
  const access_token = sessionStorage.getItem('access_token');

  return await instance.get(`/all/slider-image`, {
    params: { access_token, client_id, client_secret },
  });
};