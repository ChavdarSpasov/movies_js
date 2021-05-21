export default async function catalog() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs') ,
        footer: await this.load('./templates/common/footer.hbs')
    }

    this.partial('./templates/movie/catalog.hbs', this.app.userData);
}

export async function create() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs') ,
        footer: await this.load('./templates/common/footer.hbs')
    }

    this.partial('./templates/movie/createForm.hbs', this.app.userData);
}

export async function details() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs') ,
        footer: await this.load('./templates/common/footer.hbs')
    }

    this.partial('./templates/movie/details.hbs', this.app.userData);
}

export async function edit() {
    this.partials = {
        header: await this.load('./templates/common/header.hbs') ,
        footer: await this.load('./templates/common/footer.hbs')
    }

    this.partial('./templates/movie/editMovie.hbs', this.app.userData);
}

