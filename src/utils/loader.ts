export const showLoader = (): void => {
    const modal = document.getElementById("loader_global_modal") as HTMLDialogElement | null;
    if (modal && !modal.open) {
        modal.showModal();
    }
};

export const hideLoader = (): void => {
    const modal = document.getElementById("loader_global_modal") as HTMLDialogElement | null;
    if (modal && modal.open) {
        modal.close();
    }
};