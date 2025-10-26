export function initModal() {
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modalTarget;
            const sourceSelector = btn.dataset.source;
            const modal = document.querySelector(modalId);
            if (!modal) return;

            const modalBody = modal.querySelector('.modal-body');
            const modalTitle = modal.querySelector('.modal-title');

            if (sourceSelector) {
                const source = document.querySelector(sourceSelector);
                if (source) {
                    modalBody.innerHTML = source.innerHTML;
                }
            }

            if (btn.dataset.title) {
                modalTitle.textContent = btn.dataset.title;
            }

            modal.style.display = 'block';
        });
    });

    document.querySelectorAll('.modal-close').forEach(span => {
        span.addEventListener('click', () => {
            span.closest('.modal').style.display = 'none';
        });
    });

    document.querySelectorAll('.btn-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    window.addEventListener('keydown', e => {
        if (e.key === "Escape") {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}
