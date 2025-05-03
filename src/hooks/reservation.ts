import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
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
    ...queryOptions,
  });
};

export const useReserveSlotMutation = (
  mutationOptions?: UseMutationOptions<AxiosResponse<any>, unknown, any>,
) => {
  return useMutation({
    mutationKey: ['RESERVE_SLOT'],
    mutationFn: (payload: any) => fns.reserveSlot(payload),
    ...mutationOptions,
  });
};
