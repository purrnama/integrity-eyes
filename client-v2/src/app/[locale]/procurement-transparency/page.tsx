import StatCard from "./StatCard";
import Header from "./Header";
import TopCompaniesChart from "./TopCompaniesChart";
import RegionChart from "./RegionChart";
import CurrentTenders from "./CurrentTenders";
import CustomDatePicker from "@/components/CustomDatePicker";
import Layout from "@/components/Layout";
import { useTranslations } from "next-intl";
import CustomDialog from "@/components/CustomDialog";
import MiniMegaphoneIcon from "@/components/icons/MiniMegaphoneIcon";

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
          <StatCard
            title={intl("Total Advertisement Tenders")}
            value="133"
            interval={intl("Last 30 days")}
            percentage="+30%"
            trend="up"
            data={[14, 46, 54, 40, 11, 15, 31, 15, 86, 85]}
          />
          <StatCard
            title={intl("Total Awarded Contracts")}
            value="300"
            interval={intl("Last 30 days")}
            percentage="+30%"
            trend="up"
            data={[34, 58, 25, 18, 52, 39, 26, 96, 19, 76]}
          />
          <StatCard
            title={intl("Region with Most Contracts")}
            value="70"
            interval={intl("Last 30 days")}
            percentage="+30%"
            trend="down"
            data={[97, 45, 19, 84, 90, 98, 73, 44, 96, 34]}
          />
          <StatCard
            title={intl("Ministry with Most Contracts")}
            value="76"
            interval={intl("Last 30 days")}
            percentage="+30%"
            trend="up"
            data={[25, 72, 9, 56, 17, 26, 99, 75, 33, 64]}
          />
          <div className="sm:col-span-2">
            <TopCompaniesChart
              title={intl("Top Companies with Most Awarded Contracts")}
            />
          </div>
          <div className="sm:col-span-2">
            <RegionChart title={intl("Region and Sectors")} />
          </div>
          <div className="sm:col-span-2 xl:col-span-4">
            <CurrentTenders title={intl("Current Tenders")} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
