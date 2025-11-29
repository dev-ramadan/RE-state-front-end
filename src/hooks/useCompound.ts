import { useQuery } from '@tanstack/react-query';
import type { getAllCompoundsResponse } from '../types/Responses';
import { getAllCompounds } from '../services/compoundService';

export const useCompounds = () =>
    useQuery<getAllCompoundsResponse>({
        queryKey: ['compounds'],
        queryFn: getAllCompounds,
    });
