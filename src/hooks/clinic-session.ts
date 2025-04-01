import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as fns from 'endpoints/clinic-session';

type ListClinicSessionParams = {
  queryOptions?: UseQueryOptions;
};

type ShowClinicSessionByRefNoParams = {
    refno?: string | undefined,
    queryOptions?: UseQueryOptions;
};
  
export const useListClinicSession = ({ queryOptions }: ListClinicSessionParams) => {
    return useQuery({
      queryKey: ['CLINIC_SESSION_LIST'],
      queryFn: () => fns.getAllClinicSession(),
      ...queryOptions
    });
};

export const useShowClinicSessionByRefNo = ({refno, queryOptions}: ShowClinicSessionByRefNoParams) => {
    return useQuery({
      queryKey: ['CLINIC_SESSION_BY_REFNO', refno],
      queryFn: () => fns.getClinicSessionByRefNo(refno),
      retry: false,
      ...queryOptions
    });
};