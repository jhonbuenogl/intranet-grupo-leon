export const GET = async ({
  params,
}: {
  params: Promise<{ sigla: string }>;
}) => {
  const { sigla } = await params;
};
