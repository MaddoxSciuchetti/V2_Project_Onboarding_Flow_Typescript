import { HistoryData } from '../../types/index.types';

type HistoryContentProps = {
  historyData: HistoryData[] | undefined;
  selectedValue: string;
  data: string | undefined;
};

const HistoryContent = ({
  historyData,
  data,
  selectedValue,
}: HistoryContentProps) => {
  const optionKind =
    selectedValue === 'erledigt' ? (
      <span>Erledigt</span>
    ) : selectedValue === 'in_bearbeitung' ? (
      <span>In Bearbeitung</span>
    ) : selectedValue === 'offen' ? (
      <span>Offen</span>
    ) : (
      <span>Kein Status</span>
    );
  return (
    <>
      {historyData?.length === 0 ? (
        <p className="mt-5">Es wurden noch keine Änderungen vorgenommen</p>
      ) : (
        (historyData || []).map((item, index) => (
          <div key={index} className="">
            <div className=" mb-2 mt-1">
              <p className="text-left">
                <strong>
                  {new Date(item.timestamp || 0).toLocaleDateString()}
                </strong>
              </p>
            </div>
            <div className="flex">
              <p>Nutzer: {item.auth_user?.email}</p>
              <img className="ml-1 w-5 h-5 " src={data} />
            </div>
            <p>Status: {optionKind}</p>

            <p>Kommentar: {item.edit}</p>
          </div>
        ))
      )}
    </>
  );
};

export default HistoryContent;
