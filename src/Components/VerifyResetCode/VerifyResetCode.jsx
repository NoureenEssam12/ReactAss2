import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSpinner } from 'react-icons/fa';

const VerifyResetCode = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: Yup.object({
      resetCode: Yup.string().required("Reset code is required")
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
        setMessage("Reset code verified. You can now reset your password.");
        navigate('/ResetPassword', { state: { email: values.email } });
      } catch (error) {
        setMessage(error.response.data.message || "An error occurred");
      }finally {
        setIsLoading(false);
      }
    }
  });

  return (
    <div className='container w-5/6 mx-auto mt-24'>
      <p className="text-3xl">Verify Reset Code</p>

      {message && (
        <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {message}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="mt-5 mx-auto">
    

        <div className="mb-5">
          <label htmlFor="resetCode" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Reset Code:</label>
          <input
            type="text"
            {...formik.getFieldProps('resetCode')}
            id="resetCode"
            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
          {formik.touched.resetCode && formik.errors.resetCode ? (
            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.resetCode}
            </div>
          ) : null}
        </div>

        <button
          disabled={!(formik.isValid&&formik.dirty)}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyResetCode;
