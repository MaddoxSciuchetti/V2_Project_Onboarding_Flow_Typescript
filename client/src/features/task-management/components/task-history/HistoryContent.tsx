import { useQuery } from '@tanstack/react-query';
import { useGetWorkerHistory } from '../../hooks/use-getWorkerHistory';
import { workerQueries } from '../../query-options/query.options';

type HistoryContentProps = {
  id_original: number;
};

const HistoryContent = ({ id_original }: HistoryContentProps) => {
  const { historyData } = useGetWorkerHistory(id_original);
  const { data } = useQuery(workerQueries.getFoto());
  return (
    <>
      {historyData?.length === 0 ? (
        <p className="mt-5">Es wurden noch keine Änderungen vorgenommen</p>
      ) : (
        (historyData || []).map((item, index) => {
          return (
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
              <p>
                Status:
                {item.status === 'erledigt' ? (
                  'Erledigt'
                ) : item.status === 'in_bearbeitung' ? (
                  <span>In Bearbeitung</span>
                ) : item.status === 'offen' ? (
                  'Offen'
                ) : (
                  'Kein Status'
                )}
              </p>

              <p>Kommentar: {item.edit} </p>
            </div>
          );
        })
      )}
    </>
  );
};

export default HistoryContent;
