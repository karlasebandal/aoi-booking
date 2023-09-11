import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import banner from '../assets/images/raft-photos/banner.jpg'


const HomePage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState('')
  const [services, setServices] = useState([])
  const [selectedServiceID, setSelectedServiceID] = useState("")

  useEffect(() => {
    axios.get('http://localhost:5000/service')
      .then(response => {
        setServices(response.data); // Assuming the response contains the ID in "id" property
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      })
  }, [])

  const handleOptionChange = (event) => {
    setSelectedServiceID(event.target.value)
  }

  const handleRedirect = () => {
    
    const [serviceID, serviceName] = selectedServiceID.split('|');
    console.log('Selected Service ID:', serviceID);
    console.log('Selected Service Name:', serviceName);

    if (serviceID){
      const modifiedService = serviceName.replace(/\s+/g, '') // This will remove all spaces
      navigate(modifiedService, { state: { serviceID } })
    }
   
  }

  return (

    <div className="flex flex-wrap items-center justify-between">
      <div className="hidden sm:block">
        <img src={banner} className="static" alt="Rafting" />
      </div>
      <div className="flex-col absolute">
        
        <div className="items-center text-purity text-8xl font-header mx-20 drop-shadow-xl sm:top-1/2">
            FEEL THE RUSH, <br/>DISCOVER <br/>DAVAO RIVER
        </div>
        
        <div className="items-center mx-20 my-5 bg-navy-blue p-5 rounded-lg focus:ring-marble-blue focus:border-marble-blue">
          <label htmlFor="services" className="block mb-2 text-xl font-medium text-rescue-orange dark:text-white rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="357" height="38" viewBox="0 0 357 38" fill="none">
                <path d="M12.76 2.00003C14.6533 2.00003 16.32 2.3867 17.76 3.16003C19.2 3.9067 20.3067 4.9867 21.08 6.40003C21.88 7.78669 22.28 9.3867 22.28 11.2C22.28 12.9867 21.8667 14.56 21.04 15.92C20.2133 17.28 19.0533 18.3334 17.56 19.08C16.0667 19.8267 14.3467 20.2 12.4 20.2H8.16C8.02667 20.2 7.96 20.2667 7.96 20.4V29.4C7.96 29.5867 7.90667 29.7334 7.8 29.84C7.69334 29.9467 7.54667 30 7.36 30H1.04C0.853336 30 0.706669 29.9467 0.600003 29.84C0.493336 29.7334 0.440002 29.5867 0.440002 29.4V2.60003C0.440002 2.41336 0.493336 2.2667 0.600003 2.16003C0.706669 2.05336 0.853336 2.00003 1.04 2.00003H12.76ZM11.52 14.2C12.5067 14.2 13.2933 13.9467 13.88 13.44C14.4933 12.9067 14.8 12.2134 14.8 11.36C14.8 10.48 14.4933 9.77336 13.88 9.24003C13.2933 8.7067 12.5067 8.44003 11.52 8.44003H8.16C8.02667 8.44003 7.96 8.5067 7.96 8.64003V14C7.96 14.1334 8.02667 14.2 8.16 14.2H11.52Z" fill="#F36C21"/>
                <path d="M28.1044 7.80003C27.011 7.80003 26.1044 7.45336 25.3844 6.76003C24.691 6.04003 24.3444 5.13336 24.3444 4.04003C24.3444 2.92003 24.691 2.01336 25.3844 1.32003C26.1044 0.626696 27.011 0.280029 28.1044 0.280029C29.1977 0.280029 30.091 0.626696 30.7844 1.32003C31.5044 2.01336 31.8644 2.92003 31.8644 4.04003C31.8644 5.10669 31.5044 6.00003 30.7844 6.72003C30.091 7.44003 29.1977 7.80003 28.1044 7.80003ZM24.9044 30C24.7177 30 24.571 29.9467 24.4644 29.84C24.3577 29.7334 24.3044 29.5867 24.3044 29.4V9.80003C24.3044 9.61336 24.3577 9.4667 24.4644 9.36003C24.571 9.25336 24.7177 9.20003 24.9044 9.20003H31.2244C31.411 9.20003 31.5577 9.25336 31.6644 9.36003C31.771 9.4667 31.8244 9.61336 31.8244 9.80003V29.4C31.8244 29.5867 31.771 29.7334 31.6644 29.84C31.5577 29.9467 31.411 30 31.2244 30H24.9044Z" fill="#F36C21"/>
                <path d="M44.4206 30.32C42.154 30.32 40.1806 29.7734 38.5006 28.68C36.8206 27.56 35.594 26.0134 34.8206 24.04C34.2873 22.68 34.0206 21.16 34.0206 19.48C34.0206 17.8267 34.2873 16.32 34.8206 14.96C35.5673 13.0667 36.794 11.5867 38.5006 10.52C40.2073 9.4267 42.1806 8.88003 44.4206 8.88003C46.6873 8.88003 48.6873 9.45336 50.4206 10.6C52.1806 11.72 53.3673 13.1334 53.9806 14.84C54.1673 15.32 54.2873 15.8267 54.3406 16.36V16.48C54.3406 16.7467 54.1673 16.92 53.8206 17L47.6206 18H47.5006C47.154 18 46.9673 17.8267 46.9406 17.48L46.7806 16.92C46.6473 16.4667 46.354 16.0934 45.9006 15.8C45.474 15.48 44.9673 15.32 44.3806 15.32C43.314 15.32 42.554 15.8 42.1006 16.76C41.7806 17.4267 41.6206 18.3467 41.6206 19.52C41.6206 20.6134 41.7673 21.5334 42.0606 22.28C42.514 23.3467 43.2873 23.88 44.3806 23.88C45.554 23.88 46.354 23.2667 46.7806 22.04L46.8206 21.88C46.9006 21.4267 47.1273 21.24 47.5006 21.32L53.7406 22.36C54.0873 22.44 54.2606 22.6267 54.2606 22.92C54.2606 23.24 54.1673 23.68 53.9806 24.24C53.2873 26.1867 52.074 27.6934 50.3406 28.76C48.634 29.8 46.6606 30.32 44.4206 30.32Z" fill="#F36C21"/>
                <path d="M57.0138 30C56.8271 30 56.6804 29.9467 56.5738 29.84C56.4671 29.7334 56.4138 29.5867 56.4138 29.4V2.60003C56.4138 2.41336 56.4671 2.2667 56.5738 2.16003C56.6804 2.05336 56.8271 2.00003 57.0138 2.00003H63.3338C63.5204 2.00003 63.6671 2.05336 63.7738 2.16003C63.8804 2.2667 63.9338 2.41336 63.9338 2.60003V14.08C63.9338 14.16 63.9604 14.2134 64.0138 14.24C64.0671 14.2667 64.1204 14.24 64.1738 14.16L67.5738 9.56003C67.7338 9.32003 67.9737 9.20003 68.2937 9.20003H75.4938C75.6538 9.20003 75.7738 9.24003 75.8538 9.32003C75.9604 9.37336 76.0137 9.45336 76.0137 9.56003C76.0137 9.66669 75.9738 9.7867 75.8938 9.92003L70.7337 16.88C70.6804 16.96 70.6804 17.0534 70.7337 17.16L76.6138 29.28L76.6937 29.6C76.6937 29.8667 76.5204 30 76.1738 30H69.5738C69.2271 30 68.9871 29.84 68.8538 29.52L65.6138 21.84C65.5871 21.7867 65.5338 21.76 65.4538 21.76C65.4004 21.7334 65.3604 21.7467 65.3337 21.8L64.0138 24.04C63.9604 24.1467 63.9338 24.2267 63.9338 24.28V29.4C63.9338 29.5867 63.8804 29.7334 63.7738 29.84C63.6671 29.9467 63.5204 30 63.3338 30H57.0138Z" fill="#F36C21"/>
                <path d="M87.0491 37.96C86.9691 37.96 86.9024 37.9067 86.8491 37.8C86.7957 37.6934 86.7691 37.5467 86.7691 37.36V32.4C86.7691 32 86.9157 31.8 87.2091 31.8C88.9691 31.8 90.2091 31.6934 90.9291 31.48C91.6757 31.2667 92.1024 30.8134 92.2091 30.12L92.1691 29.88L85.8491 9.88003C85.8224 9.8267 85.8091 9.7467 85.8091 9.64003C85.8091 9.3467 85.9957 9.20003 86.3691 9.20003H93.0891C93.4624 9.20003 93.6891 9.37336 93.7691 9.72003L95.9291 20.4C95.9557 20.5067 95.9957 20.56 96.0491 20.56C96.1024 20.56 96.1424 20.5067 96.1691 20.4L98.3291 9.72003C98.4091 9.37336 98.6357 9.20003 99.0091 9.20003H105.569C106.022 9.20003 106.182 9.4267 106.049 9.88003L99.5291 30.08C98.8357 32.1334 98.1024 33.6934 97.3291 34.76C96.5557 35.8267 95.3957 36.6267 93.8491 37.16C92.3291 37.6934 90.1557 37.96 87.3291 37.96H87.0491Z" fill="#F36C21"/>
                <path d="M116.098 30.32C113.564 30.32 111.418 29.64 109.658 28.28C107.924 26.92 106.777 25.08 106.217 22.76C105.951 21.8 105.817 20.7334 105.817 19.56C105.817 18.2534 105.978 17.0667 106.298 16C106.938 13.7867 108.111 12.0534 109.817 10.8C111.551 9.52003 113.657 8.88003 116.137 8.88003C118.617 8.88003 120.698 9.52003 122.378 10.8C124.084 12.0534 125.257 13.76 125.897 15.92C126.217 17.04 126.378 18.2267 126.378 19.48C126.378 20.4934 126.271 21.5067 126.058 22.52C125.498 24.92 124.337 26.8267 122.577 28.24C120.844 29.6267 118.684 30.32 116.098 30.32ZM116.098 23.88C116.791 23.88 117.351 23.6534 117.778 23.2C118.204 22.72 118.498 22.0934 118.658 21.32C118.764 20.8134 118.817 20.2134 118.817 19.52C118.817 18.9067 118.751 18.2934 118.618 17.68C118.218 16.1067 117.378 15.32 116.098 15.32C114.764 15.32 113.924 16.1067 113.577 17.68C113.444 18.1334 113.378 18.7467 113.378 19.52C113.378 20.2134 113.431 20.8134 113.537 21.32C113.937 23.0267 114.791 23.88 116.098 23.88Z" fill="#F36C21"/>
                <path d="M140.482 9.80003C140.482 9.61336 140.536 9.4667 140.642 9.36003C140.749 9.25336 140.896 9.20003 141.082 9.20003H147.402C147.589 9.20003 147.736 9.25336 147.842 9.36003C147.949 9.4667 148.002 9.61336 148.002 9.80003V29.4C148.002 29.5867 147.949 29.7334 147.842 29.84C147.736 29.9467 147.589 30 147.402 30H141.082C140.896 30 140.749 29.9467 140.642 29.84C140.536 29.7334 140.482 29.5867 140.482 29.4V28.08C140.482 28 140.456 27.9467 140.402 27.92C140.349 27.8934 140.296 27.92 140.242 28C139.149 29.5467 137.442 30.32 135.122 30.32C133.096 30.32 131.482 29.6667 130.282 28.36C129.082 27.0267 128.482 25.1867 128.482 22.84V9.80003C128.482 9.61336 128.536 9.4667 128.642 9.36003C128.749 9.25336 128.896 9.20003 129.082 9.20003H135.402C135.589 9.20003 135.736 9.25336 135.842 9.36003C135.949 9.4667 136.002 9.61336 136.002 9.80003V21.2C136.002 22 136.202 22.6534 136.602 23.16C137.029 23.64 137.576 23.88 138.242 23.88C138.829 23.88 139.309 23.7067 139.682 23.36C140.082 22.9867 140.336 22.4934 140.442 21.88C140.469 21.8267 140.482 21.7467 140.482 21.64V9.80003Z" fill="#F36C21"/>
                <path d="M162.312 8.92003C163.219 8.92003 163.939 9.09336 164.473 9.44003C164.713 9.57336 164.806 9.8267 164.753 10.2L163.792 16.36C163.766 16.5734 163.686 16.7067 163.553 16.76C163.446 16.8134 163.286 16.8134 163.072 16.76C162.592 16.6534 162.166 16.6 161.792 16.6C161.392 16.6 161.019 16.64 160.673 16.72C159.979 16.8534 159.379 17.1467 158.872 17.6C158.392 18.0267 158.152 18.6134 158.152 19.36V29.4C158.152 29.5867 158.099 29.7334 157.992 29.84C157.886 29.9467 157.739 30 157.553 30H151.232C151.046 30 150.899 29.9467 150.792 29.84C150.686 29.7334 150.633 29.5867 150.633 29.4V9.80003C150.633 9.61336 150.686 9.4667 150.792 9.36003C150.899 9.25336 151.046 9.20003 151.232 9.20003H157.553C157.739 9.20003 157.886 9.25336 157.992 9.36003C158.099 9.4667 158.152 9.61336 158.152 9.80003V10.76C158.152 10.84 158.179 10.8934 158.232 10.92C158.286 10.9467 158.326 10.9334 158.352 10.88C159.366 9.57336 160.686 8.92003 162.312 8.92003Z" fill="#F36C21"/>
                <path d="M183.54 8.88003C185.353 8.88003 187.02 9.1867 188.54 9.80003C190.06 10.4134 191.26 11.2534 192.14 12.32C193.02 13.3867 193.46 14.5467 193.46 15.8V29.4C193.46 29.5867 193.406 29.7334 193.3 29.84C193.193 29.9467 193.046 30 192.86 30H186.54C186.353 30 186.206 29.9467 186.1 29.84C185.993 29.7334 185.94 29.5867 185.94 29.4V28C185.94 27.8934 185.913 27.84 185.86 27.84C185.833 27.8134 185.793 27.84 185.74 27.92C185.286 28.7467 184.66 29.36 183.86 29.76C183.06 30.1334 182.006 30.32 180.7 30.32C178.513 30.32 176.793 29.8267 175.54 28.84C174.286 27.8267 173.66 26.36 173.66 24.44C173.66 22.4134 174.366 20.8534 175.78 19.76C177.22 18.6667 179.3 18.12 182.02 18.12H185.74C185.873 18.12 185.94 18.0534 185.94 17.92V17.2C185.94 16.64 185.726 16.1867 185.3 15.84C184.9 15.4934 184.353 15.32 183.66 15.32C183.18 15.32 182.753 15.4 182.38 15.56C182.006 15.72 181.74 15.9334 181.58 16.2C181.473 16.3867 181.366 16.52 181.26 16.6C181.18 16.6534 181.06 16.6667 180.9 16.64L174.46 15.84C174.086 15.7867 173.9 15.6267 173.9 15.36C174.006 14.16 174.486 13.0667 175.34 12.08C176.193 11.0934 177.326 10.32 178.74 9.76003C180.18 9.17336 181.78 8.88003 183.54 8.88003ZM183.02 25.12C183.873 25.12 184.566 24.8934 185.1 24.44C185.66 23.9867 185.94 23.3734 185.94 22.6V22.08C185.94 21.9467 185.873 21.88 185.74 21.88H183.74C182.06 21.88 181.22 22.4267 181.22 23.52C181.22 24 181.366 24.3867 181.66 24.68C181.98 24.9734 182.433 25.12 183.02 25.12Z" fill="#F36C21"/>
                <path d="M208.981 2.60003C208.981 2.41336 209.035 2.2667 209.141 2.16003C209.248 2.05336 209.395 2.00003 209.581 2.00003H215.901C216.088 2.00003 216.235 2.05336 216.341 2.16003C216.448 2.2667 216.501 2.41336 216.501 2.60003V29.4C216.501 29.5867 216.448 29.7334 216.341 29.84C216.235 29.9467 216.088 30 215.901 30H209.581C209.395 30 209.248 29.9467 209.141 29.84C209.035 29.7334 208.981 29.5867 208.981 29.4V28.2C208.981 28.12 208.955 28.0667 208.901 28.04C208.848 28.0134 208.795 28.04 208.741 28.12C207.755 29.5867 206.208 30.32 204.101 30.32C202.315 30.32 200.701 29.76 199.261 28.64C197.848 27.4934 196.848 25.9467 196.261 24C195.861 22.6667 195.661 21.1734 195.661 19.52C195.661 17.6 195.955 15.8934 196.541 14.4C197.181 12.7734 198.181 11.4534 199.541 10.44C200.901 9.40003 202.528 8.88003 204.421 8.88003C206.368 8.88003 207.808 9.49336 208.741 10.72C208.795 10.7734 208.848 10.8 208.901 10.8C208.955 10.7734 208.981 10.72 208.981 10.64V2.60003ZM208.381 22.52C208.781 21.7467 208.981 20.7867 208.981 19.64C208.981 18.36 208.768 17.3334 208.341 16.56C207.861 15.7334 207.168 15.32 206.261 15.32C205.301 15.32 204.595 15.76 204.141 16.64C203.741 17.3867 203.541 18.3867 203.541 19.64C203.541 20.84 203.741 21.8134 204.141 22.56C204.621 23.44 205.328 23.88 206.261 23.88C207.195 23.88 207.901 23.4267 208.381 22.52Z" fill="#F36C21"/>
                <path d="M225.425 30C225.079 30 224.852 29.84 224.745 29.52L218.625 9.88003C218.599 9.8267 218.585 9.7467 218.585 9.64003C218.585 9.3467 218.772 9.20003 219.145 9.20003H226.025C226.399 9.20003 226.625 9.37336 226.705 9.72003L228.825 19.64C228.852 19.7467 228.892 19.8 228.945 19.8C228.999 19.8 229.039 19.7467 229.065 19.64L231.185 9.72003C231.265 9.37336 231.492 9.20003 231.865 9.20003L238.745 9.28003C238.959 9.28003 239.105 9.3467 239.185 9.48003C239.292 9.5867 239.319 9.7467 239.265 9.96003L233.185 29.52C233.079 29.84 232.852 30 232.505 30H225.425Z" fill="#F36C21"/>
                <path d="M259.499 18.12C259.579 18.7067 259.619 19.3067 259.619 19.92C259.619 20.3467 259.605 20.68 259.579 20.92C259.579 21.2934 259.379 21.48 258.979 21.48H246.979C246.872 21.48 246.819 21.5334 246.819 21.64C246.819 21.88 246.925 22.16 247.139 22.48C247.405 22.9334 247.872 23.32 248.539 23.64C249.232 23.9334 250.005 24.08 250.859 24.08C251.579 24.08 252.245 23.9734 252.859 23.76C253.472 23.5467 253.992 23.24 254.419 22.84C254.552 22.7334 254.685 22.68 254.819 22.68C255.005 22.68 255.152 22.76 255.259 22.92L258.299 26.8C258.405 26.9334 258.459 27.08 258.459 27.24C258.459 27.4 258.392 27.5334 258.259 27.64C257.325 28.5467 256.165 29.2267 254.779 29.68C253.392 30.1067 251.899 30.32 250.299 30.32C247.819 30.32 245.699 29.8 243.939 28.76C242.179 27.72 240.899 26.24 240.099 24.32C239.512 22.9334 239.219 21.44 239.219 19.84C239.219 18.16 239.459 16.6667 239.939 15.36C240.659 13.3334 241.845 11.7467 243.499 10.6C245.152 9.45336 247.099 8.88003 249.339 8.88003C251.045 8.88003 252.619 9.28003 254.059 10.08C255.525 10.88 256.725 11.9867 257.659 13.4C258.619 14.7867 259.232 16.36 259.499 18.12ZM249.299 15.32C248.205 15.32 247.445 15.8534 247.019 16.92L246.859 17.36C246.832 17.44 246.845 17.5067 246.899 17.56C246.952 17.5867 247.005 17.6 247.059 17.6H251.619C251.725 17.6 251.779 17.5467 251.779 17.44C251.779 17.3334 251.739 17.16 251.659 16.92C251.525 16.4134 251.245 16.0267 250.819 15.76C250.419 15.4667 249.912 15.32 249.299 15.32Z" fill="#F36C21"/>
                <path d="M274.089 8.88003C275.422 8.88003 276.622 9.17336 277.689 9.76003C278.756 10.3467 279.596 11.2134 280.209 12.36C280.849 13.48 281.169 14.8134 281.169 16.36V29.4C281.169 29.5867 281.116 29.7334 281.009 29.84C280.902 29.9467 280.756 30 280.569 30H274.249C274.062 30 273.916 29.9467 273.809 29.84C273.702 29.7334 273.649 29.5867 273.649 29.4V18C273.649 17.2 273.436 16.56 273.009 16.08C272.609 15.5734 272.076 15.32 271.409 15.32C270.716 15.32 270.156 15.5734 269.729 16.08C269.329 16.56 269.129 17.2 269.129 18V29.4C269.129 29.5867 269.076 29.7334 268.969 29.84C268.862 29.9467 268.716 30 268.529 30H262.209C262.022 30 261.876 29.9467 261.769 29.84C261.662 29.7334 261.609 29.5867 261.609 29.4V9.80003C261.609 9.61336 261.662 9.4667 261.769 9.36003C261.876 9.25336 262.022 9.20003 262.209 9.20003H268.529C268.716 9.20003 268.862 9.25336 268.969 9.36003C269.076 9.4667 269.129 9.61336 269.129 9.80003V11.24C269.129 11.3467 269.156 11.4134 269.209 11.44C269.262 11.4667 269.302 11.44 269.329 11.36C270.342 9.7067 271.929 8.88003 274.089 8.88003Z" fill="#F36C21"/>
                <path d="M297.279 14.6C297.279 14.7867 297.226 14.9334 297.119 15.04C297.013 15.1467 296.866 15.2 296.679 15.2H293.359C293.226 15.2 293.159 15.2667 293.159 15.4V21.68C293.159 23.0134 293.639 23.68 294.599 23.68H296.079C296.266 23.68 296.413 23.7334 296.519 23.84C296.626 23.9467 296.679 24.0934 296.679 24.28V29.4C296.679 29.7734 296.479 29.9867 296.079 30.04C295.039 30.12 294.039 30.16 293.079 30.16C290.653 30.16 288.866 29.7867 287.719 29.04C286.573 28.2934 285.986 26.88 285.959 24.8V15.4C285.959 15.2667 285.893 15.2 285.759 15.2H283.599C283.413 15.2 283.266 15.1467 283.159 15.04C283.053 14.9334 282.999 14.7867 282.999 14.6V9.80003C282.999 9.61336 283.053 9.4667 283.159 9.36003C283.266 9.25336 283.413 9.20003 283.599 9.20003H285.759C285.893 9.20003 285.959 9.13336 285.959 9.00003V4.20003C285.959 4.01336 286.013 3.8667 286.119 3.76003C286.226 3.65336 286.373 3.60003 286.559 3.60003H292.559C292.746 3.60003 292.893 3.65336 292.999 3.76003C293.106 3.8667 293.159 4.01336 293.159 4.20003V9.00003C293.159 9.13336 293.226 9.20003 293.359 9.20003H296.679C296.866 9.20003 297.013 9.25336 297.119 9.36003C297.226 9.4667 297.279 9.61336 297.279 9.80003V14.6Z" fill="#F36C21"/>
                <path d="M311.224 9.80003C311.224 9.61336 311.278 9.4667 311.384 9.36003C311.491 9.25336 311.638 9.20003 311.824 9.20003H318.144C318.331 9.20003 318.478 9.25336 318.584 9.36003C318.691 9.4667 318.744 9.61336 318.744 9.80003V29.4C318.744 29.5867 318.691 29.7334 318.584 29.84C318.478 29.9467 318.331 30 318.144 30H311.824C311.638 30 311.491 29.9467 311.384 29.84C311.278 29.7334 311.224 29.5867 311.224 29.4V28.08C311.224 28 311.198 27.9467 311.144 27.92C311.091 27.8934 311.038 27.92 310.984 28C309.891 29.5467 308.184 30.32 305.864 30.32C303.838 30.32 302.224 29.6667 301.024 28.36C299.824 27.0267 299.224 25.1867 299.224 22.84V9.80003C299.224 9.61336 299.278 9.4667 299.384 9.36003C299.491 9.25336 299.638 9.20003 299.824 9.20003H306.144C306.331 9.20003 306.478 9.25336 306.584 9.36003C306.691 9.4667 306.744 9.61336 306.744 9.80003V21.2C306.744 22 306.944 22.6534 307.344 23.16C307.771 23.64 308.318 23.88 308.984 23.88C309.571 23.88 310.051 23.7067 310.424 23.36C310.824 22.9867 311.078 22.4934 311.184 21.88C311.211 21.8267 311.224 21.7467 311.224 21.64V9.80003Z" fill="#F36C21"/>
                <path d="M333.055 8.92003C333.961 8.92003 334.681 9.09336 335.215 9.44003C335.455 9.57336 335.548 9.8267 335.495 10.2L334.535 16.36C334.508 16.5734 334.428 16.7067 334.295 16.76C334.188 16.8134 334.028 16.8134 333.815 16.76C333.335 16.6534 332.908 16.6 332.535 16.6C332.135 16.6 331.761 16.64 331.415 16.72C330.721 16.8534 330.121 17.1467 329.615 17.6C329.135 18.0267 328.895 18.6134 328.895 19.36V29.4C328.895 29.5867 328.841 29.7334 328.735 29.84C328.628 29.9467 328.481 30 328.295 30H321.975C321.788 30 321.641 29.9467 321.535 29.84C321.428 29.7334 321.375 29.5867 321.375 29.4V9.80003C321.375 9.61336 321.428 9.4667 321.535 9.36003C321.641 9.25336 321.788 9.20003 321.975 9.20003H328.295C328.481 9.20003 328.628 9.25336 328.735 9.36003C328.841 9.4667 328.895 9.61336 328.895 9.80003V10.76C328.895 10.84 328.921 10.8934 328.975 10.92C329.028 10.9467 329.068 10.9334 329.095 10.88C330.108 9.57336 331.428 8.92003 333.055 8.92003Z" fill="#F36C21"/>
                <path d="M356.491 18.12C356.571 18.7067 356.611 19.3067 356.611 19.92C356.611 20.3467 356.598 20.68 356.571 20.92C356.571 21.2934 356.371 21.48 355.971 21.48H343.971C343.864 21.48 343.811 21.5334 343.811 21.64C343.811 21.88 343.918 22.16 344.131 22.48C344.398 22.9334 344.864 23.32 345.531 23.64C346.224 23.9334 346.998 24.08 347.851 24.08C348.571 24.08 349.238 23.9734 349.851 23.76C350.464 23.5467 350.984 23.24 351.411 22.84C351.544 22.7334 351.678 22.68 351.811 22.68C351.998 22.68 352.144 22.76 352.251 22.92L355.291 26.8C355.398 26.9334 355.451 27.08 355.451 27.24C355.451 27.4 355.384 27.5334 355.251 27.64C354.318 28.5467 353.158 29.2267 351.771 29.68C350.384 30.1067 348.891 30.32 347.291 30.32C344.811 30.32 342.691 29.8 340.931 28.76C339.171 27.72 337.891 26.24 337.091 24.32C336.504 22.9334 336.211 21.44 336.211 19.84C336.211 18.16 336.451 16.6667 336.931 15.36C337.651 13.3334 338.838 11.7467 340.491 10.6C342.144 9.45336 344.091 8.88003 346.331 8.88003C348.038 8.88003 349.611 9.28003 351.051 10.08C352.518 10.88 353.718 11.9867 354.651 13.4C355.611 14.7867 356.224 16.36 356.491 18.12ZM346.291 15.32C345.198 15.32 344.438 15.8534 344.011 16.92L343.851 17.36C343.824 17.44 343.838 17.5067 343.891 17.56C343.944 17.5867 343.998 17.6 344.051 17.6H348.611C348.718 17.6 348.771 17.5467 348.771 17.44C348.771 17.3334 348.731 17.16 348.651 16.92C348.518 16.4134 348.238 16.0267 347.811 15.76C347.411 15.4667 346.904 15.32 346.291 15.32Z" fill="#F36C21"/>
            </svg>
          </label>

          <select 
            name="services"
            value={selectedServiceID} 
            onChange={handleOptionChange} 
            id="services" 
            className="bg-navy-blue border hover:bg-marble-blue border-marble-blue text-purity text-sm rounded-lg focus:ring-marble-blue focus:border-marble-blue block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option value="#" className="hover:bg-marble-blue">Select an option</option>
              {services.map(service => (
                <option className="hover:bg-marble-blue" key={service.serviceid} value={`${service.serviceid}|${service.name}`}
                >{service.name}</option>
              ))}
              
          </select>

          <button className="text-right flex space-x-3 md:mt-6" onClick={handleRedirect}>
            <div>
              <div className="mb-1 text-xl text-purity inline-flex items-end">
                <svg className="inline-flex items-end" xmlns="http://www.w3.org/2000/svg" width="94" height="21" viewBox="0 0 94 21" fill="none">
                        <path d="M11.93 0.45C11.93 0.31 11.97 0.200001 12.05 0.120001C12.13 0.0400007 12.24 0 12.38 0H17.12C17.26 0 17.37 0.0400007 17.45 0.120001C17.53 0.200001 17.57 0.31 17.57 0.45V20.55C17.57 20.69 17.53 20.8 17.45 20.88C17.37 20.96 17.26 21 17.12 21H12.59C12.35 21 12.17 20.9 12.05 20.7L5.93001 10.5C5.89001 10.44 5.85001 10.42 5.81001 10.44C5.77001 10.44 5.75001 10.48 5.75001 10.56L5.81001 20.55C5.81001 20.69 5.77001 20.8 5.69001 20.88C5.61001 20.96 5.50001 21 5.36001 21H0.620013C0.480013 21 0.370013 20.96 0.290013 20.88C0.210013 20.8 0.170013 20.69 0.170013 20.55V0.45C0.170013 0.31 0.210013 0.200001 0.290013 0.120001C0.370013 0.0400007 0.480013 0 0.620013 0H5.15001C5.39001 0 5.57001 0.1 5.69001 0.3L11.78 10.5C11.82 10.56 11.86 10.59 11.9 10.59C11.94 10.57 11.96 10.52 11.96 10.44L11.93 0.45Z" fill="#F36C21"/>
                        <path d="M35.1261 4.38C35.1261 4.52 35.0861 4.63 35.0061 4.71C34.9261 4.79 34.8161 4.83 34.6761 4.83H25.7061C25.6061 4.83 25.5561 4.88 25.5561 4.98V7.8C25.5561 7.9 25.6061 7.95 25.7061 7.95H31.2561C31.3961 7.95 31.5061 7.99 31.5861 8.07C31.6661 8.15 31.7061 8.26 31.7061 8.4V12.3C31.7061 12.44 31.6661 12.55 31.5861 12.63C31.5061 12.71 31.3961 12.75 31.2561 12.75H25.7061C25.6061 12.75 25.5561 12.8 25.5561 12.9V16.02C25.5561 16.12 25.6061 16.17 25.7061 16.17H34.6761C34.8161 16.17 34.9261 16.21 35.0061 16.29C35.0861 16.37 35.1261 16.48 35.1261 16.62V20.55C35.1261 20.69 35.0861 20.8 35.0061 20.88C34.9261 20.96 34.8161 21 34.6761 21H20.3661C20.2261 21 20.1161 20.96 20.0361 20.88C19.9561 20.8 19.9161 20.69 19.9161 20.55V0.45C19.9161 0.31 19.9561 0.200001 20.0361 0.120001C20.1161 0.0400007 20.2261 0 20.3661 0H34.6761C34.8161 0 34.9261 0.0400007 35.0061 0.120001C35.0861 0.200001 35.1261 0.31 35.1261 0.45V4.38Z" fill="#F36C21"/>
                        <path d="M36.9955 21C36.8755 21 36.7755 20.98 36.6955 20.94C36.6355 20.88 36.6055 20.81 36.6055 20.73C36.6055 20.63 36.6355 20.54 36.6955 20.46L42.1555 10.59C42.1955 10.53 42.1955 10.47 42.1555 10.41L36.6955 0.540001C36.6355 0.440001 36.6055 0.350001 36.6055 0.27C36.6055 0.19 36.6355 0.130001 36.6955 0.0900011C36.7755 0.0300007 36.8755 0 36.9955 0H42.1855C42.4455 0 42.6255 0.110001 42.7255 0.330002L45.6655 6C45.7255 6.08 45.7855 6.08 45.8455 6L48.7855 0.330002C48.9055 0.110001 49.0855 0 49.3255 0H54.4855C54.6055 0 54.6955 0.0300007 54.7555 0.0900011C54.8355 0.130001 54.8755 0.19 54.8755 0.27C54.8755 0.350001 54.8455 0.440001 54.7855 0.540001L49.3555 10.41C49.3355 10.47 49.3355 10.53 49.3555 10.59L54.7855 20.46C54.8455 20.54 54.8755 20.63 54.8755 20.73C54.8755 20.81 54.8355 20.88 54.7555 20.94C54.6955 20.98 54.6055 21 54.4855 21H49.3555C49.1155 21 48.9355 20.89 48.8155 20.67L45.8455 15.03C45.7855 14.93 45.7255 14.93 45.6655 15.03L42.6955 20.67C42.5955 20.89 42.4155 21 42.1555 21H36.9955Z" fill="#F36C21"/>
                        <path d="M72.4909 0C72.6309 0 72.7409 0.0400007 72.8209 0.120001C72.9009 0.200001 72.9409 0.31 72.9409 0.45V4.41C72.9409 4.55 72.9009 4.66 72.8209 4.74C72.7409 4.82 72.6309 4.86 72.4909 4.86H67.4509C67.3509 4.86 67.3009 4.91 67.3009 5.01V20.55C67.3009 20.69 67.2609 20.8 67.1809 20.88C67.1009 20.96 66.9909 21 66.8509 21H62.1109C61.9709 21 61.8609 20.96 61.7809 20.88C61.7009 20.8 61.6609 20.69 61.6609 20.55V5.01C61.6609 4.91 61.6109 4.86 61.5109 4.86H56.6209C56.4809 4.86 56.3709 4.82 56.2909 4.74C56.2109 4.66 56.1709 4.55 56.1709 4.41V0.45C56.1709 0.31 56.2109 0.200001 56.2909 0.120001C56.3709 0.0400007 56.4809 0 56.6209 0H72.4909Z" fill="#F36C21"/>
                        <path d="M80.6485 20.43C80.5285 20.47 80.4585 20.49 80.4385 20.49C80.2385 20.49 80.1385 20.35 80.1385 20.07V15.69C80.1385 15.43 80.2585 15.26 80.4985 15.18L87.0385 12.78C87.1585 12.72 87.1585 12.66 87.0385 12.6L80.4985 10.2C80.2585 10.1 80.1385 9.93 80.1385 9.69V5.31C80.1385 5.13 80.1785 5.01 80.2585 4.95C80.3585 4.87 80.4885 4.87 80.6485 4.95L92.7685 10.14C92.9885 10.24 93.0985 10.41 93.0985 10.65V14.73C93.0985 14.95 92.9885 15.12 92.7685 15.24L80.6485 20.43Z" fill="#F36C21"/>
                </svg>        
              </div>
            </div>
          </button>

          

        </div>
      </div>          
    </div>
    
  )
}

export default HomePage

