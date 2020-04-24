import { message } from 'antd';
import { apollo, showLazyMessage } from 'utils';
import {
  CreateMaterialMutationFn,
  MaterialsDocument,
  DeleteMaterialDocument,
  MaterialTagsDocument,
  DeleteMaterialMutationVariables,
} from 'generated/graphql';

const sendDeleteMaterialMutation = async (variables: DeleteMaterialMutationVariables): Promise<void> => {
  await apollo.mutate<CreateMaterialMutationFn>({
    mutation: DeleteMaterialDocument,
    variables,
    refetchQueries: [{ query: MaterialsDocument }, { query: MaterialTagsDocument }],
  });
};

export const deleteMaterial = async (materialId: string): Promise<boolean> => {
  const hideLoading = message.loading('Trwa dadawanie materiału...', 0);
  let isSuccess: boolean;

  try {
    await sendDeleteMaterialMutation({ id: materialId });
    showLazyMessage('success', 'Usunąłeś materiał');
    isSuccess = true;
  } catch (ex) {
    console.error(ex);
    showLazyMessage('error', 'Podczas usuwania materiału wystąpił błąd');
    isSuccess = false;
  } finally {
    hideLoading();
  }

  return isSuccess;
};
