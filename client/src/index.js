import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ProcurementDashboard from './components/procurement dashboard/procurement_dashboard';
import reportWebVitals from './reportWebVitals';
import CurrentTenderPage from './components/procurement dashboard/current_tender_page';
import LoginPage from './components/authentication/login';
import MainDashboard from './components/main_dashboard/main_dashboard';
import RiskManagementDashboard from './components/risk_management/risk_management';
import StakeHolderFeedbackDashboard from './components/stakeholder_feedback/stakeholder_feedbakc';
import ProjectPerformanceDashboard from './components/project_performance/project_performance';
import RisksRedFlagsDashboard from './components/risks_red_flags/risks_red_flags';
import CurrentAwardedContractPage from './components/procurement dashboard/awarded_contract_page';

const router = createBrowserRouter([
  {
    path:"/",
    element: <ProcurementDashboard />
  },
  {
    path: "/login",
    element:<LoginPage/>
  },
  {
    path: "/main_dashboard",
    element: <MainDashboard/>
  },
  {
    path: "/risk_management",
    element: <RiskManagementDashboard/>
  },
  {
    path: "/stakeholder_feedback",
    element:<StakeHolderFeedbackDashboard/>
  },
  {
    path: "/project_performance",
    element: <ProjectPerformanceDashboard/>
  },
  {
    path:"/risks_red_flags",
    element: <RisksRedFlagsDashboard/>
  },
  {
    path:"/current_tender_page",
    element: <CurrentTenderPage/>
  },
  {
    path:"/current_awarded_contract_page",
    element: <CurrentAwardedContractPage/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
