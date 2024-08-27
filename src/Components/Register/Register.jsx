import React, { useContext } from 'react'
import { useState } from 'react'
import Style from "./Register.module.css"
import { useEffect } from 'react'
import { Formik,useFormik, useFormikContext } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export default function () {
const {setToken}=useContext(UserContext)
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const schema = Yup.object().shape({
    name: Yup.string()
      .required("name is required")
      .min(3, "name min length is 3"),
      
    email: Yup.string().required("email is required").email("email pattern is inavalid"),
    password: Yup.string()
    .required("Password is required")
    .matches(
      /^[A-Za-z][A-Za-z0-9]{5,8}$/,
      `Password must: 
  * Start with a letter (either uppercase or lowercase).
  * Be between 6 and 9 characters in total.
  * Can only contain letters (A-Z or a-z) and numbers (0-9).`
    ),
    rePassword: Yup.string()
      .required("re-Password is required")
      .oneOf([Yup.ref("password")], "re-Password pattern is inavalid"),

    phone: Yup.string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "invalid Phone"),
  });


  const navigate = useNavigate();
  const formik = useFormik({
    //! init
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
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
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
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
    console.log("Mounting Register");
  }, []);
  return (
    <div className='container w-5/6 mx-auto mt-24'>
      <p className="text-3xl mt-4">register now</p>

      {errMsg ? (
        <>
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        </>
      ) : null}
  

      <form onSubmit={formik.handleSubmit} className="mt-4 mx-auto">
        <div className="mb-3">
          <label htmlFor="name" className="block mb-1 text-lg font-medium text-gray-900 dark:text-white ">Name:</label>
          <input
            {...formik.getFieldProps("name")}
            type="text"
            name="name"
            id="name"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formik.errors.name && formik.touched.name ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="block mb-1 text-lg font-medium text-gray-900 dark:text-white">Email:</label>
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


        <div className="mb-3">
          <label htmlFor="password" className="block mb-1 text-lg font-medium text-gray-900 dark:text-white">password:</label>
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


        <div className="mb-3">
          <label htmlFor="rePassword" className="block mb-1 text-lg font-medium text-gray-900 dark:text-white">Re-Password:</label>
          <input
            {...formik.getFieldProps("rePassword")}
            type="password"
            name="rePassword"
            id="rePassword"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : null}
        </div>




        <div className="mb-1">
          <label htmlFor="phone" className="block mb-1 text-lg font-medium text-gray-900 dark:text-white">Phone:</label>
          <input
            {...formik.getFieldProps("phone")}
            type="tel"
            name="phone"
            id="phone"
            className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : null}
        </div>



        <div className="flex justify-between">
         <div></div>
          <button
          disabled={!(formik.isValid&&formik.dirty)}
          type="submit"
          className="text-white disabled:bg-green-200 disabled:text-gray-500 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {isLoading? <FaSpinner className="animate-spin" /> : "Register now"}
        </button>
        </div>
      </form>
    </div>
  );
}
