import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import Style from "./Login.module.css";

export default function Login() {
  const {setToken} = useContext(UserContext)
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = Yup.object().shape({
   
    email: Yup.string().required("email is required").email("email pattern is inavalid"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Za-z].{3,}/,
        "password pattern is inavalid"
      ),
     
  });

  const navigate = useNavigate();
  const formik = useFormik({
    //! init
    initialValues: {
     
      email: "",
      password: "",
     
    },

    //! OnSubmit formik.errors {}
    onSubmit: handleSubmit,

   
    validationSchema: schema,

  });
  //!
  async function handleSubmit(values) {
    setIsLoading(true);
    try {
      const {data} = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if(data.message == "success") {
        //! home ??? token 
        navigate('/')
        setToken(data.token)
      }
    } catch (error) {
      setErrMsg(error.response.data.message);
      console.log(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  // console.log(formik.values);

  // console.log(formik.errors);
  useEffect(() => {
    console.log("Mounting Login");
  }, []);

  return (
    <div className='container w-5/6 mx-auto mt-24'>
      <p className="text-3xl">login now</p>

      {errMsg ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errMsg}
        </div>
      ) : null}

      <form onSubmit={formik.handleSubmit} className="mt-5 mx-auto">
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white ">Email:</label>
          <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Password:</label>
          <input
            {...formik.getFieldProps("password")}
            type="password"
            name="password"
            id="password"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}
        </div>

        <div className="flex justify-between">
        <Link to="/ForgotPassword" className='hover:text-green-600'>Forget your password?</Link>
                  <button
          disabled={!(formik.isValid&&formik.dirty)}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading ? <FaSpinner className="animate-spin" /> : "login now"}
        </button>
        </div>
      </form>
    </div>
  );
}
