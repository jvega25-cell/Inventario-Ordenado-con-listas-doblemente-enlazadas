class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.anterior = null;
        this.siguiente = null;
    }
}

class Inventario {
    constructor() {
        this.primero = null;
        this.ultimo = null;
    }

    comparar(a, b) {
        let na = Number(a);
        let nb = Number(b);
        if (a !== "" && b !== "" && !isNaN(na) && !isNaN(nb)) {
            return na - nb;
        }
        return String(a).localeCompare(String(b));
    }

    nodoPosicion(codigo) {
        let actual = this.primero;
        while (actual != null && this.comparar(actual.dato.codigo, codigo) < 0) {
            actual = actual.siguiente;
        }
        return actual;
    }

    agregar(producto) {
        let nuevo = new Nodo(producto);

        if (this.primero == null) {
            this.primero = nuevo;
            this.ultimo = nuevo;
            return true;
        }

        let actual = this.nodoPosicion(producto.codigo);

        if (actual != null && this.comparar(actual.dato.codigo, producto.codigo) == 0) {
            return false;
        }

        if (actual == null) {
            nuevo.anterior = this.ultimo;
            this.ultimo.siguiente = nuevo;
            this.ultimo = nuevo;
        } else if (actual == this.primero) {
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
            this.primero = nuevo;
        } else {
            nuevo.siguiente = actual;
            nuevo.anterior = actual.anterior;
            actual.anterior.siguiente = nuevo;
            actual.anterior = nuevo;
        }
        return true;
    }

    buscarNodo(codigo) {
        if (this.primero == null ||
            this.comparar(codigo, this.primero.dato.codigo) < 0 ||
            this.comparar(codigo, this.ultimo.dato.codigo) > 0) {
            return null;
        }
        let actual = this.nodoPosicion(codigo);
        if (actual != null && this.comparar(actual.dato.codigo, codigo) == 0) {
            return actual;
        }
        return null;
    }

    buscar(codigo) {
        let nodo = this.buscarNodo(codigo);
        if (nodo == null) {
            return null;
        }
        return nodo.dato;
    }

    quitarNodo(nodo) {
        if (nodo.anterior == null) {
            this.primero = nodo.siguiente;
        } else {
            nodo.anterior.siguiente = nodo.siguiente;
        }

        if (nodo.siguiente == null) {
            this.ultimo = nodo.anterior;
        } else {
            nodo.siguiente.anterior = nodo.anterior;
        }

        nodo.anterior = null;
        nodo.siguiente = null;
        return nodo.dato;
    }

    eliminar(codigo) {
        let nodo = this.buscarNodo(codigo);
        if (nodo == null) {
            return null;
        }
        return this.quitarNodo(nodo);
    }

    extraerPrimero() {
        if (this.primero == null) {
            return null;
        }
        return this.quitarNodo(this.primero);
    }

    extraerUltimo() {
        if (this.ultimo == null) {
            return null;
        }
        return this.quitarNodo(this.ultimo);
    }

    listar() {
        if (this.primero == null) {
            return "<p>Inventario vacío</p>";
        }
        let texto = "";
        let actual = this.primero;
        while (actual != null) {
            texto += actual.dato.infoHtml();
            actual = actual.siguiente;
        }
        return texto;
    }

    listarInverso() {
        if (this.ultimo == null) {
            return "<p>Inventario vacío</p>";
        }
        let texto = "";
        let actual = this.ultimo;
        while (actual != null) {
            texto += actual.dato.infoHtml();
            actual = actual.anterior;
        }
        return texto;
    }
}
