import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { IHuyen, ISearchBaoCao, ITinh, IXa } from "../model/model";
import { MIN_DATE_200 } from "../../../Constant";

type Props = {
  children: React.ReactNode;
  searchObject: ISearchBaoCao;
  handleSearch: (values: ISearchBaoCao) => void;
};

const FilterSearchContainer = (props: Props) => {
  const { children, searchObject, handleSearch } = props;
  const handleSubmit = (values: ISearchBaoCao) => {
    handleSearch(values);
  };

  return (
    <Formik
      initialValues={searchObject}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form noValidate>
        {children}
      </Form>
    </Formik>
  );
};

export default FilterSearchContainer;
