import API from '@/config/apiClient';

export default function sendAgentMessage(data: string) {
  return API.post<string, string>('/user/sendAgentMessage', { value: data });
}
