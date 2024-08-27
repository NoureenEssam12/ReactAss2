import React, { useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import Style from './CheckOut.module.css';

export default function CheckOut() {
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { CheckOutSession } = useContext(CartContext);
  const { cartId } = useParams();

  // Define the schema before using it
  const schema = Yup.object().shape({
    details: Yup.string().required('Details are required').min(3, 'Details must be at least 3 characters'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(/^01[0125][0-9]{8}$/, 'Invalid phone number'),
    city: Yup.string().required('City is required'),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await CheckOutSession(cartId, values);
        window.location.href = response.data.session.url;
      } catch (error) {
        setErrMsg('Something went wrong. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {
    console.log('CheckOut component mounted');
  }, []);

  return (
    <div className='container w-5/6 mx-auto mt-24'>

      {errMsg && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {errMsg}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="mt-5 mx-auto">
        <div className="mb-5">
          <label htmlFor="details" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Details
          </label>
          <input
            {...formik.getFieldProps('details')}
            type="text"
            name="details"
            id="details"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formik.errors.details && formik.touched.details && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.details}
            </div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="phone" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            Phone
          </label>
          <input
            {...formik.getFieldProps('phone')}
            type="tel"
            name="phone"
            id="phone"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.phone}
            </div>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="city" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
            City
          </label>
          <input
            {...formik.getFieldProps('city')}
            type="text"
            name="city"
            id="city"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formik.errors.city && formik.touched.city && (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.city}
            </div>
          )}
        </div>

        <button
          disabled={!(formik.isValid&&formik.dirty)}
          type="submit"
          className="mt-10 border-cyan-400 border  dark:disabled:hover:bg-gray-700  disabled:hover:bg-white disabled:text-cyan-400     disabled:dark:hover:text-cyan-400   hover:bg-sky-400  text-cyan-400   dark:hover:bg-sky-700   dark:hover:text-white  hover:text-black   text-black bg-white  focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg  text-lg w-full  py-1 text-center dark:bg-gray-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin mx-auto" /> : 'Pay now'}
        </button>
      </form>
    </div>
  );
}
