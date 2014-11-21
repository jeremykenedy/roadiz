<?php
/**
 * Copyright © 2014, REZO ZERO
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished
 * to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 *
 * Except as contained in this notice, the name of the REZO ZERO shall not
 * be used in advertising or otherwise to promote the sale, use or other dealings
 * in this Software without prior written authorization from the REZO ZERO SARL.
 *
 * @file ImportController.php
 * @copyright REZO ZERO 2014
 * @author Ambroise Maupate
 */
namespace RZ\Roadiz\CMS\Controllers;

use RZ\Roadiz\Core\Kernel;
use RZ\Roadiz\CMS\Controllers\AppController;
use RZ\Roadiz\CMS\Importer\SettingsImporter;
use RZ\Roadiz\Core\Entities\Document;
use RZ\Roadiz\Core\Entities\Node;
use RZ\Roadiz\Core\Entities\Translation;
use RZ\Roadiz\Core\Entities\User;
use RZ\Roadiz\Core\Entities\Role;

use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Form\Forms;
use Symfony\Component\Form\Extension\HttpFoundation\HttpFoundationExtension;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Type;
use Symfony\Component\Form\Extension\Validator\ValidatorExtension;
use Symfony\Component\Validator\Validation;

use GeneratedNodeSources\NSPage;

use Themes\Install\InstallApp;

/**
 * Class to have generique importer for all theme.
 */
class ImportController extends InstallApp
{
    /**
     * Import theme's Settings file.
     *
     * @param int $themeId
     *
     * @return string
     */
    public static function importSettingsAction(Request $request, $filename, $themeId = null)
    {
        #$pathFile = '/Resources/import/settings.rzt';
        if (null === $themeId) {
            $filename = RENZO_ROOT . '/themes/Install/' . $filename;
        }
        $classImporter = "RZ\Roadiz\CMS\Importers\SettingsImporter";
        return self::importContent($filename, $classImporter, $themeId);
    }

    /**
     * Import theme's Roles file.
     *
     * @param int $themeId
     *
     * @return string
     */
    public static function importRolesAction(Request $request, $filename, $themeId = null)
    {
        #$pathFile = '/Resources/import/roles.rzt';
        if (null === $themeId) {
            $filename = RENZO_ROOT . '/themes/Install/' . $filename;
        }
        $classImporter = "RZ\Roadiz\CMS\Importers\RolesImporter";
        return self::importContent($filename, $classImporter, $themeId);
    }

    /**
     * Import theme's Groups file.
     *
     * @param int $themeId
     *
     * @return string
     */
    public static function importGroupsAction(Request $request, $filename, $themeId = null)
    {
        #$pathFile = '/Resources/import/groups.rzt';
        if (null === $themeId) {
            $filename = RENZO_ROOT . '/themes/Install/' . $filename;
        }
        $classImporter = "RZ\Roadiz\CMS\Importers\GroupsImporter";
        return self::importContent($filename, $classImporter, $themeId);
    }

    /**
     * Import NodeTypes file.
     *
     * @param int $themeId
     *
     * @return string
     */
    public static function importNodeTypesAction(Request $request, $filename, $themeId = null)
    {
        #$pathFile = '/Resources/import/nodetype/' . basename($filename) . '.rzt';
        if (null === $themeId) {
            $filename = RENZO_ROOT . '/themes/Install/' . $filename;
        }
        $classImporter = "RZ\Roadiz\CMS\Importers\NodeTypesImporter";
        return self::importContent($filename, $classImporter, $themeId);
    }

    /**
     * Import Tags file.
     *
     * @param int $themeId
     *
     * @return string
     */
    public static function importTagsAction(Request $request, $filename, $themeId = null)
    {
        #$pathFile = '/Resources/import/nodetype/' . basename($filename) . '.rzt';
        if (null === $themeId) {
            $filename = RENZO_ROOT . '/themes/Install/' . $filename;
        }
        $classImporter = "RZ\Roadiz\CMS\Importers\TagsImporter";
        return self::importContent($filename, $classImporter, $themeId);
    }

    /**
     * Import Nodes file.
     *
     *
     * @return string
     */
    public static function importNodesAction(Request $request, $filename, $themeId = null)
    {
        if (null === $themeId) {
            $filename = RENZO_ROOT . '/themes/Install/' . $filename;
        }
        $classImporter = "RZ\Roadiz\CMS\Importers\NodesImporter";
        return self::importContent($filename, $classImporter, $themeId);
    }

    /**
     * Import theme's Settings file.
     *
     * @param string $pathFile
     * @param string $classImporter
     * @param int    $themeId
     *
     * @return string
     */
    public static function importContent($pathFile, $classImporter, $themeId)
    {
        $data = array();
        $data['status'] = false;
        try {
            if (null === $themeId) {
                $path = $pathFile;
            } else {
                $theme = Kernel::getService('em')
                         ->find('RZ\Roadiz\Core\Entities\Theme', $themeId);

                if ($theme === null) {
                    throw new \Exception('Theme don\'t exist in database.');
                }

                $dir = explode('\\', $theme->getClassName());
                $path = RENZO_ROOT . "/themes/" . $dir[2] . '/' . $pathFile;

            }
            if (file_exists($path)) {
                $file = file_get_contents($path);
                $ret = $classImporter::importJsonFile($file);
            } else {
                throw new \Exception('File: ' . $path . ' don\'t exist');
            }
        } catch (\Exception $e) {
            $data['error'] = $e->getMessage();
            return new Response(
                json_encode($data),
                Response::HTTP_NOT_FOUND,
                array('content-type' => 'application/javascript')
            );
        }
        $data['status'] = true;
        return new Response(
            json_encode($data),
            Response::HTTP_OK,
            array('content-type' => 'application/javascript')
        );
    }
}