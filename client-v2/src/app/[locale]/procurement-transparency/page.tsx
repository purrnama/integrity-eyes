import Header from "./Header";
import TopCompaniesChart from "./TopCompaniesChart";
import RegionChart from "./RegionChart";
import CustomDatePicker from "@/components/CustomDatePicker";
import Layout from "@/components/Layout";
import { useTranslations } from "next-intl";
import CustomDialog from "@/components/CustomDialog";
import MiniMegaphoneIcon from "@/components/icons/MiniMegaphoneIcon";
import TotalAdvertisementTenders from "./TotalAdvertisementTenders";
import TotalAwardedContracts from "./TotalAwardedContracts";
import RegionWithMostContracts from "./RegionWithMostContracts";
import MinistryWithMostContracts from "./MinistryWithMostContracts";
import CurrentTendersDataGrid from "./CurrentTendersDataGrid";

export default function ProcurementTransparency() {
  const intl = useTranslations("procurement-transparency");

  return (
    <Layout>
      <div className="flex flex-col space-y-4 lg:-mt-4">
        <Header />
        <div className="flex flex-row justify-between">
          <div className="flex flex-row space-x-4 items-center">
            <h2 className="font-medium">{intl("Procurement Transparency")}</h2>
            <CustomDialog
              icon={<MiniMegaphoneIcon />}
              triggerTitle={intl("Remarks")}
              dialogTitle={intl("Dashboard Remarks")}
              dialogContent={
                <>
                  <p className="font-bold">{intl("Data sources")}:</p>
                  <ol className="list-decimal list-inside indent-8">
                    <li>
                      <a
                        href="https://myprocurement.treasury.gov.my"
                        target="_blank"
                      >
                        {intl(
                          "MyProcurement Malaysian Ministry of Finance Portal",
                        )}
                      </a>
                    </li>
                    <li>
                      <a href="https://www.cidb.gov.my" target="_blank">
                        {intl("CIDB Construction Industry Development Board")}
                      </a>
                    </li>
                    <li>
                      <a href="https://www.jkr.gov.my" target="_blank">
                        {intl("JKR Public Works Department of Malaysia")}
                      </a>
                    </li>
                    <li>
                      <a href="https://home.eperolehan.gov.my" target="_blank">
                        {intl(
                          "ePerolehan Malaysian Electronic Procurement System",
                        )}
                      </a>
                    </li>
                  </ol>
                </>
              }
              dialogClose={intl("Close")}
            />
          </div>
          <CustomDatePicker />
        </div>
        <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 w-full gap-4 justify-stretch">
          <TotalAdvertisementTenders
            title={intl("Total Advertisement Tenders")}
            interval={intl("All time")}
          />
          <TotalAwardedContracts
            title={intl("Total Awarded Contracts")}
            interval={intl("All time")}
          />
          <RegionWithMostContracts
            title={intl("Region with Most Contracts")}
            interval={intl("All time")}
          />
          <MinistryWithMostContracts
            title={intl("Ministry with Most Contracts")}
            interval={intl("All time")}
          />
          <div className="sm:col-span-2">
            <TopCompaniesChart
              title={intl("Top Companies with Most Awarded Contracts")}
              tooltip={intl("Contracts")}
              topTitle={intl("Top")}
            />
          </div>
          <div className="sm:col-span-2">
            <RegionChart title={intl("Region and Sectors")} />
          </div>
          <div className="sm:col-span-2 xl:col-span-4">
            <CurrentTendersDataGrid title={intl("Current Tenders")} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
