class Alerts {

    static toast({ icon, title }) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: icon,
            title: title
        });

    }

    static async confirmDelete() {
        return await Swal.fire({
            title: "Você tem certeza que deseja excluir?",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#696969",

            confirmButtonText: "Sim",
            confirmButtonColor: "#1f8459"
        })
    }
}

export { Alerts }