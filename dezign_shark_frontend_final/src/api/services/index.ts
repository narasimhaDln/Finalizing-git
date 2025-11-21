// import { Product } from "../../pages/ProductsFindOne/productsData";
// import axios from "axios";
import type { AxiosRequestConfig } from 'axios';
import { http } from '../http';
// import { http2 } from "../http2";

interface LeadData {
  name: string;
  email: string;
  phoneNumber: string;
  services?: string[];
  message?: string;
}

// Email form API
export const contactForm = (data: LeadData) => {
  return http.post('/leads', data);
};

export const getAllJobs = (config?: AxiosRequestConfig) => {
  return http.get('/jobs/', config);
};

export const getJobById = (id: string) => {
  return http.get(`/jobs/${id}`);
};

export interface ApplicationPayload {
  job: string;
  name: string;
  email: string;
  phone?: string;
  currentLocation?: string;
  experience?: number;
  noticePeriod?: string;
  currentCTC?: number;
  expectedCTC?: number;
  portfolioLink?: string;
  linkedInUrl?: string;
  resumeUrl?: string;
  coverLetter?: string;
  source?: string;
  consent?: boolean;
}

export const applicationForm = (data: ApplicationPayload) => {
  return http.post('/applications', data);
};
// export const applicationFormm = (data: any) => {
//   return http.post("/applicationss", data);
// }

// export const FileUpload = (folderName: string, file: File) => {
//   const formData = new FormData();
//   formData.append('file', file); // Append the file to FormData
//   return http2.post(`/bunny/upload/${folderName}`, formData);
// };

// Local/backend upload to avoid CORS during testing and production
export const FileUpload = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('path', '//DezignShark Careers');
  formData.append('fileId', '688a1c0520ce3a9592e4893f');

  return http.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
