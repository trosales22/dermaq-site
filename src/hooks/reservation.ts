import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import * as fns from 'endpoints/reservation';
import { removeEmpty } from 'utils';

type ListReservationParams = {
    params?: any;
    queryOptions?: UseQueryOptions;
};
  
export const useListReservation = ({ params, queryOptions }: ListReservationParams) => {
    return useQuery({
        queryKey: ['RESERVATION_LIST', removeEmpty(params)],
        queryFn: () => fns.getAllReservation(params),
        retry: false,
        ...queryOptions
    });
};